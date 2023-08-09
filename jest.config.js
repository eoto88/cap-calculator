// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/$1"
  },
  transform: { "^.+\\.(js|jsx)$": "babel-jest", },
};

module.exports = config;
