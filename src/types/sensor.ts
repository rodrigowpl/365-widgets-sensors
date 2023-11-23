export enum SensorType {
  Thermometer = "thermometer",
  Humidity = "humidity",
  Monoxide = "monoxide",
}

export enum SensorStatus {
  Precise = "precise",
  VeryPrecise = "very precise",
  UltraPrecise = "ultra precise",
  Keep = "keep",
  Discard = "discard",
}

export type SensorReference = {
  temperature: number;
  humidity: number;
  monoxide: number;
};

export type SensorReading = {
  timestamp: string;
  value: number;
};

export type Sensor = {
  type: string;
  name: string;
};

export type SensorOutput = {
  [key: string]: SensorStatus;
};
