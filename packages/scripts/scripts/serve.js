const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const {
	getArgs,
	hasArg,
	hasConsumerConfiguration,
	getPackageConfiguration,
} = require('../utilities');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const { scriptArgs } = getArgs();

const hasViteConfig = () => hasArg('config') || hasArg('c') || hasConsumerConfiguration('vite');

const configArgs = hasViteConfig()
	? []
	: [
			'--config',
			getPackageConfiguration('vite'),
	  ];

const { status } = spawn(
	resolveBin('vite'),
	[
		...configArgs,
		...scriptArgs,
	],
	{
		stdio: 'inherit',
	}
);

process.exit(status || 1);
