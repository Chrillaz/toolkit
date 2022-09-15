const { sync } = require('cross-spawn');
const { package } = require('../utilities/paths');
const { validateScript, getArgs } = require('../utilities/cli');
const args = getArgs();

const scriptName = validateScript(args.scriptName);

const { signal, status } = sync(
	'node',
	[package.script(scriptName), ...args.scriptArgs],
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
