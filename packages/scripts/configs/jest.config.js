const { getPackageValue } = require('../utilities/package');
const { consumer, getConfigPath } = require('../utilities/paths');

const rootDir = consumer.root;

const displayName = getPackageValue('name');

const config = {
	rootDir,
	displayName,
	moduleFileExtensions: [
		'js',
		'jsx',
	],
	setupFilesAfterEnv: [getConfigPath('jest.setup')],
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url: 'http://localhost:3000',
	},
	testPathIgnorePatterns: ['/node_modules/'],
	testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
	transform: {
		'^.+\\.(js|jsx)?$': require.resolve('babel-jest'),
	},
	verbose: true,
};

if (!!consumer.resolve('tsconfig')) {
	config.globals = {
		'ts-jest': {
			tsconfig: getConfigPath('tsconfig'),
		},
	};

	config.moduleFileExtensions = [
		...config.moduleFileExtensions,
		'ts',
		'tsx',
	];

	config.transform['^.+.(ts|tsx)?$'] = require.resolve('ts-jest');
}

module.exports = config;
