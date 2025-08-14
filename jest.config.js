export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  passWithNoTests: true,
  testTimeout: 20_000,
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};
