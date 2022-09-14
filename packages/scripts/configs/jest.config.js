const { hasConfig, getConfig } = require('../utilities/config');
const { getPackageValue } = require('../utilities/package');
const { consumer } = require('../utilities/paths');

const rootDir = consumer.root;

const displayName = getPackageValue('name');

const config = {
	rootDir,
	displayName,
  moduleFileExtensions: ["js", "jsx"],
	setupFilesAfterEnv: [getConfig('jest.setup')],
	testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  testPathIgnorePatterns: ["/node_modules/"],
	testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
	transform: {
		'^.+\\.(js|jsx)?$': require.resolve('babel-jest'),
	},
	verbose: true,
};

if (hasConfig('tsconfig')) {
	config.globals = {
		'ts-jest': {
			tsconfig: getConfig('tsconfig'),
		},
	};

	config.moduleFileExtensions = [...config.moduleFileExtensions, 'ts', 'tsx'];

	config.transform['^.+.(ts|tsx)?$'] = require.resolve('ts-jest');
}

module.exports = config;