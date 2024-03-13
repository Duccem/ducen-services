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
      branches: 60,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text-summary'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  coveragePathIgnorePatterns: ['node_modules', 'dist', 'test'],
};
export default config;
