# 365-Widgets sensor

## Project idea
365-Widgets makes inexpensive home sensors such as thermometers, humidistats, and carbon monoxide detectors. In order to spot-check the manufacturing process, some units are put in a test environment (for an unspecified amount of time) and their readings are logged. The test environment is controlled with a known temperature, humidity, and CO concentration, but the inexpensive sensors are expected to have some variation with each reading.

In `src/index.ts` is exporting a function called `evaluateLogFile` that is receiving `logContentsStr` parameter, which is a txt file in an specific format. You can check an example in `src/mocks/log.txt`. If no file entry passed to `logContentsStr`, that file will be read in order to execute the logic.

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
- Run `yarn dev (or npm run dev)` to run the server

### Available scripts
- `yarn dev (or npm dev)`: Run the api in dev mode
- `yarn test (or npm run test)`: Run jest unit tests
