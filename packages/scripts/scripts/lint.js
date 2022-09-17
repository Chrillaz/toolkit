const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const {
	hasArg,
	getArgs,
	getFileArg,
	hasConsumerConfiguration,
	getPackageConfiguration,
} = require('../utilities');

const { scriptArgs } = getArgs();

const hasEslintConfig = () =>
	hasArg('config') || hasArg('c') || hasConsumerConfiguration('.eslint');

const configArgs = hasEslintConfig()
	? []
	: [
			'--config',
			getPackageConfiguration('.eslint'),
			'--no-eslintrc',
	  ];

const hasEslintIgnore = () => hasArg('--ignore-path') || hasConsumerConfiguration('.eslintignore');

const ignoreArgs = hasEslintIgnore()
	? []
	: [
			'--ignore-path',
			getPackageConfiguration('.eslintignore'),
	  ];

const extArgs = hasArg('ext')
	? []
	: [
			'--ext',
			'js,jsx,ts,tsx',
	  ];

const fileArgs = getFileArg().length > 0 ? [] : ['.'];

const { status } = spawn(
	resolveBin('eslint'),
	[
		...configArgs,
		...ignoreArgs,
		...extArgs,
		...scriptArgs,
		...fileArgs,
	],
	{
		stdio: 'inherit',
	}
);

process.exit(status || 1);
