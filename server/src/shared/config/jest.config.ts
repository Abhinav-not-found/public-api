import type { Config } from 'jest';

const config: Config = {
  rootDir: '../../../',

  testEnvironment: 'node',
  // setupFiles: ['<rootDir>/server/src/shared/config/jest.setup.ts'],

  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },

  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',

    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
