/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest",
  clearMocks: true,
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverage: true,
  // setupFilesAfterEnv: ["./jest.setup.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/app.ts",
    "<rootDir>/src/database.ts",
    "<rootDir>/src/utils",
    "<rootDir>/src/middlewares",
    "<rootDir>/src/controllers",
    "<rootDir>/src/repositories",
    "<rootDir>/src/routes",
    "<rootDir>/src/schemas",
    "<rootDir>/tests/factories",
  ],
};