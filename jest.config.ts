// eslint-disable-next-line import/no-anonymous-default-export
export default {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  moduleNameMapper: {
    "^~/tests/(.*)$": "<rootDir>/tests/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  testTimeout: 500,
};
