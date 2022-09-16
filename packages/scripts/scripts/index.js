const { sync } = require('cross-spawn');
const { getPackageScript } = require('../utilities');
const { validateScript, getArgs } = require('../utilities/cli');
const { nodeArgs, scriptName, scriptArgs } = getArgs();

validateScript(scriptName);

const { signal, status } = sync(
	'node',
	[
    ...nodeArgs,
		getPackageScript(scriptName),
		...scriptArgs,
	],
	{
		stdio: 'inherit',
	}
);

if (!signal) {
	process.exit(status || undefined);
}

if (signal === 'SIGKILL' || signal === 'SIGTERM') {
	console.log(chalk.red('The script failed because the process exited too early.'));
}

process.exit(1);
