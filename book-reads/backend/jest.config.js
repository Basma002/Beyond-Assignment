/** @type {import('ts-jest').JestConfigWithTsJest} */
require("dotenv").config({ path: ".env.test" }); 

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/tests/singleton.ts"], 
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], 
  },
};

process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://test_user:12345@localhost:5432/test_db?schema=public";
