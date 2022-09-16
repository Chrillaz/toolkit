const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const { hasConsumerConfiguration, getPackageConfiguration } = require('../utilities');
const { getArgs, hasArg } = require('../utilities/cli');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const { scriptArgs } = getArgs();

const configArgs = [];

if (!hasArg('config') || !hasConsumerConfiguration('jest')) {
	configArgs.push('--config');
	configArgs.push(getPackageConfiguration('jest'));
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
