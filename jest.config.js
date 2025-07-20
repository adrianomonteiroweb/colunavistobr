module.exports = {
  // Usa jsdom para testes frontend, mas node para backend
  testEnvironment: process.env.TEST_ENV === "node" ? "node" : "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@packages/ui/(.*)$": "<rootDir>/../ui/src/$1",
    "^@packages/db/(.*)$": "<rootDir>/../db/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["<rootDir>/**/*.test.(ts|tsx|js)"],
};
