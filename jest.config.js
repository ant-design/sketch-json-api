module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
};
