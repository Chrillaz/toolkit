const {
  consumerRoot,
	hasConsumerConfiguration,
	getKeyFromPackage,
	getPackageConfiguration,
	getConsumerConfiguration,
} = require('../utilities');

const config = {
	rootDir: consumerRoot,
	displayName: getKeyFromPackage('name'),
	moduleFileExtensions: [
		'js',
		'jsx',
	],
	setupFilesAfterEnv: [getPackageConfiguration('jest.setup')],
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

if (hasConsumerConfiguration('jest.setup')) {
	config.setupFilesAfterEnv.push(getConsumerConfiguration('jest.setup'));
}

if (hasConsumerConfiguration('tsconfig')) {
	config.globals = {
		'ts-jest': {
			tsconfig: getConsumerConfiguration('tsconfig'),
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
