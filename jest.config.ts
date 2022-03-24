module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
      '^src/(.*)$': '<rootDir>/$1',
    },
    testPathIgnorePatterns: ['e2e/'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
  };
