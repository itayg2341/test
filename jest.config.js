export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.m?[tj]s$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  setupFiles: ["dotenv/config"],
  passWithNoTests: true,
  testTimeout: 20_000,
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};
