const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const {
	getArgs,
	hasArg,
	hasConsumerConfiguration,
	getPackageConfiguration,
} = require('../utilities');

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const { scriptArgs } = getArgs();

const hasWebpackConfig = () => (
	hasArg('config') || hasArg('c') || hasConsumerConfiguration('webpack')
);

const configArgs = hasWebpackConfig()
	? []
	: [
			'--config',
			getPackageConfiguration('webpack'),
	  ];

const { status } = spawn(
	resolveBin('webpack'),
	[
		...configArgs,
		...scriptArgs,
	],
	{
		stdio: 'inherit',
	}
);

process.exit(status || 1);
