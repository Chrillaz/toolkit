const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const { getArgs, hasConfig, getPackageConfiguration } = require('../utilities');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const { scriptArgs } = getArgs();

const configArgs = hasConfig('vite')
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
