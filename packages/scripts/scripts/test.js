const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const { hasConsumerConfiguration, getPackageConfiguration } = require('../utilities');
const { getArgs, hasArg } = require('../utilities/cli');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const hasConfigOption = hasArg('config') || hasArg('c');
const hasConfigFile = hasConsumerConfiguration('jest');
const hasJestConfig = () => hasConfigOption || hasConfigFile;

const { scriptArgs } = getArgs();

let configArgs = [];

if (!hasJestConfig()) {
	configArgs = [
		'--config',
		getPackageConfiguration('jest'),
	];
}

const { status } = spawn(
	resolveBin('jest'),
	[
		...configArgs,
		...scriptArgs,
	],
	{
		stdio: 'inherit',
	}
);

process.exit(status || 1);
