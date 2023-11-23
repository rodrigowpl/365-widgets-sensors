import {
  normalizeLogData,
  evaluateHumidity,
  evaluateThermometer,
  evaluateMonoxide,
} from "~/services";

import { SensorStatus } from "~/types/sensor";

import { logFileInput, logFileOutput, referenceInput } from "../mocks";

describe("Calc device variance", () => {
  test("it should normalize the log data correctly", async () => {
    const result = await normalizeLogData(logFileInput);
    expect(result).toEqual(logFileOutput);
  });

  test("it evalute thermometer as precise", async () => {
    const temperature = [
      72.4, 76.0, 79, 79.1, 75.6, 71.2, 71.4, 69.2, 65.8, 62.4, 65.8, 61.4, 64,
      67.5, 69.4,
    ];

    const result = await evaluateThermometer(
      referenceInput,
      temperature.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe(SensorStatus.Precise);
  });

  test("it should evalute thermometer as very precise", async () => {
    const temperature = [
      72.4, 76.0, 79, 79.1, 75.6, 71.2, 71.4, 69.2, 65.8, 62.4, 65.8, 61.4, 64,
      67.5, 69.4, 70.0, 70.1, 70.2, 70.3, 70.4,
    ];

    const result = await evaluateThermometer(
      referenceInput,
      temperature.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe(SensorStatus.VeryPrecise);
  });

  test("it should evalute thermometer as ultra precise", async () => {
    const temperature = [69.5, 70.1, 71.3, 71.5, 69.8];

    const result = await evaluateThermometer(
      referenceInput,
      temperature.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe("ultra precise");
  });

  test("it should evaluate humidity as keep", async () => {
    const humidity = [45.2, 45.3, 45.1];

    const result = await evaluateHumidity(
      referenceInput,
      humidity.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe(SensorStatus.Keep);
  });

  test("it should evaluate humidity as discard", async () => {
    const humidity = [44.4, 43.9, 44.9, 43.8, 42.1];

    const result = await evaluateHumidity(
      referenceInput,
      humidity.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe(SensorStatus.Discard);
  });

  test("it should evaluate monoxide as keep", async () => {
    const monoxide = [5, 6, 9];

    const result = await evaluateMonoxide(
      referenceInput,
      monoxide.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe(SensorStatus.Keep);
  });

  test("it should evaluate monoxide as discard", async () => {
    const monoxide = [2, 4, 10, 8, 6];

    const result = await evaluateMonoxide(
      referenceInput,
      monoxide.map((value) => ({ timestamp: "2007-04-05T22:00", value })),
    );

    expect(result).toBe(SensorStatus.Discard);
  });
});
