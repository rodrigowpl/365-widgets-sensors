export const logFileInput =
  "reference 70.0 45.0 6\nthermometer temp-1\n2007-04-05T22:00 72.4\n2007-04-05T22:01 76.0\n";

export const logFileOutput = {
  reference: {
    temperature: 70,
    humidity: 45,
    monoxide: 6,
  },
  sensors: {
    "temp-1": {
      type: "thermometer",
      name: "temp-1",
    },
  },
  readings: {
    "temp-1": [
      {
        timestamp: "2007-04-05T22:00",
        value: 72.4,
      },
      {
        timestamp: "2007-04-05T22:01",
        value: 76.0,
      },
    ],
  },
};

export const sensorVarianceOutput = {
  "temp-1": "precise",
  "temp-2": "ultra precise",
  "hum-1": "keep",
  "hum-2": "discard",
  "mon-1": "keep",
  "mon-2": "discard",
};

export const referenceInput = { temperature: 70, humidity: 45, monoxide: 6 };
