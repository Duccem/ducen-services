import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  coverageReporters: ['text-summary'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  coveragePathIgnorePatterns: ['node_modules', 'dist', 'test'],
  transformIgnorePatterns: ['node_modules', 'dist'],
  modulePathIgnorePatterns: ['node_modules', 'dist'],
  watchPathIgnorePatterns: ['node_modules', 'dist'],
};
export default config;
