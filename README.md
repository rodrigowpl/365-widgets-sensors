# 365-Widgets sensor

## Idea
365-Widgets makes inexpensive home sensors such as thermometers, humidistats, and carbon monoxide detectors. In order to spot-check the manufacturing process, some units are put in a test environment (for an unspecified amount of time) and their readings are logged. The test environment is controlled with a known temperature, humidity, and CO concentration, but the inexpensive sensors are expected to have some variation with each reading.

## Sensor criteria

1) For a thermometer, it is branded “ultra precise” if the mean of the readings is within 0.5 degrees of the known temperature, and the standard deviation is less than 3. It is branded “very precise” if the mean is within 0.5 degrees of the room, and the standard deviation is under 5. Otherwise, it’s sold as “precise”.

2) For a humidity sensor, it must be discarded unless it is within 1 humidity percent of the reference value for all readings. (All humidity sensor readings are a decimal value representing percent moisture saturation.)

3) For a carbon monoxide detector, it must be discarded unless it is within 3 ppm of the reference value for all readings. (All carbon monoxide readings are an integer value representing parts per million.)

In `src/index.ts` is exporting a function called `evaluateLogFile` that is receiving `logContentsStr` parameter, which is a txt file in an specific format.

You can check an example in `src/mocks/log.txt`.

If no file entry passed to `logContentsStr`, that file will be read in order to execute the logic.

This function will return an output like below:
```
{
"temp-1": "precise",
"temp-2": "ultra precise",
"hum-1": "keep",
"hum-2": "discard",
"mon-1": "keep",
"mon-2": "discard"
}
```

### Dependencies
- Node js => v18

## Project Layout
```
.vscode
  └─ Recommended settings for VSCode users
src
  └─ helpers
      └─ Utility functions to be reused
  └─ mocks
      └─ Mock data to be used in use-cases logic
  └─ services
      └─ Use cases & logics
  └─ tests
      └─ Use cases tests files
  └─ types
      └─ Reused types/contracts
```

### Up and Running
- Install dependencies `yarn (or npm ci)`
- Run `yarn dev (or npm run dev)` to run the server and execute the `evaluateLogFile` returning the output mentioned above.

### Available scripts
- `yarn dev (or npm dev)`: Run the server in dev mode
- `yarn test (or npm run test)`: Run jest unit tests
