/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/singleton.ts"], 
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], 
  },
  globalSetup: "<rootDir>/tests/setupTestEnv.js" 
};

process.env.DATABASE_URL = "postgresql://test_user:12345@localhost:5432/test_db?schema=public";

