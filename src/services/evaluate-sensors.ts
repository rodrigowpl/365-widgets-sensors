import {
  calculateMean,
  calculateStandardDeviation,
} from "~/helpers/calc";
import {
  Sensor,
  SensorOutput,
  SensorReading,
  SensorReference,
  SensorStatus,
  SensorType,
} from "~/types/sensor";

const supportedSensorTypes = [
  SensorType.Thermometer,
  SensorType.Humidity,
  SensorType.Monoxide,
];

export const normalizeLogData = async (logContentsStr: string) => {
  const logData = logContentsStr.split("\n");

  let reference: SensorReference = {
    temperature: 0,
    humidity: 0,
    monoxide: 0,
  };

  const sensors: {
    [key: string]: Sensor;
  } = {};

  const readings: {
    [key: string]: SensorReading[];
  } = {};

  let currentSensor: string | null = null;

  for (const log of logData) {
    const [type, column1, column2, column3] = log.split(" ");

    if (type === "reference") {
      reference = {
        temperature: parseFloat(column1),
        humidity: parseFloat(column2),
        monoxide: parseFloat(column3),
      };
    } else if (supportedSensorTypes.includes(type as SensorType)) {
      currentSensor = column1;

      if (!sensors[currentSensor]) {
        sensors[currentSensor] = {
          type,
          name: currentSensor,
        };
        readings[currentSensor] = [];
      }
    } else if (currentSensor && column1) {
      readings[currentSensor].push({
        timestamp: type,
        value: parseFloat(column1),
      });
    }
  }

  return {
    reference,
    sensors,
    readings,
  };
};

export const evaluateThermometer = async (
  reference: SensorReference,
  readings: SensorReading[],
): Promise<SensorStatus> => {
  const mean = calculateMean(readings.map((reading) => reading.value));
  const standardDeviation = calculateStandardDeviation(
    readings.map((reading) => reading.value),
  );

  if (Math.abs(mean - reference.temperature) <= 0.5 && standardDeviation <= 3) {
    return SensorStatus.UltraPrecise;
  }

  if (Math.abs(mean - reference.temperature) <= 0.5 && standardDeviation <= 5) {
    return SensorStatus.VeryPrecise;
  }

  return SensorStatus.Precise;
};

export const evaluateHumidity = async (
  reference: SensorReference,
  readings: SensorReading[],
): Promise<SensorStatus> => {
  for (const reading of readings) {
    if (Math.abs(reading.value - reference.humidity) > 1) {
      return SensorStatus.Discard;
    }
  }

  return SensorStatus.Keep;
};

export const evaluateMonoxide = async (
  reference: SensorReference,
  readings: SensorReading[],
): Promise<SensorStatus> => {
  for (const reading of readings) {
    if (Math.abs(reading.value - reference.monoxide) > 3) {
      return SensorStatus.Discard;
    }
  }

  return SensorStatus.Keep;
};

export const evaluateSensors = async (logContentsStr: string) => {
  const normalizedData = await normalizeLogData(logContentsStr);

  const result: SensorOutput = {};

  for (const sensor in normalizedData.sensors) {
    const sensorType = normalizedData.sensors[sensor].type;
    const readings = normalizedData.readings[sensor];

    if (sensorType === SensorType.Thermometer) {
      result[sensor] = await evaluateThermometer(
        normalizedData.reference,
        readings,
      );
    }

    if (sensorType === SensorType.Humidity) {
      result[sensor] = await evaluateHumidity(
        normalizedData.reference,
        readings,
      );
    }

    if (sensorType === SensorType.Monoxide) {
      result[sensor] = await evaluateMonoxide(
        normalizedData.reference,
        readings,
      );
    }
  }

  return result;
};
