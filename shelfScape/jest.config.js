// eslint-disable-next-line no-undef
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
    },
  };
  