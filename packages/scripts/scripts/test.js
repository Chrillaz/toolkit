const { sync: spawn } = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const { hasArg, getArg } = require('../utilities/cli');
const { getConfig } = require('../utilities/config');
const { consumer } = require('../utilities/paths');

let scriptArgs = ['--config', getConfig('jest')];

if (hasArg('config') || hasArg('c')) {
	scriptArgs = ['--config', consumer.resolve(getArg('config') || getArg('c'))];
}

if (hasArg('watch')) {
	scriptArgs.push(getArg('watch'));
}

const { status } = spawn(resolveBin('jest'), [...scriptArgs], {
	stdio: 'inherit',
});

process.exit(status === null ? 1 : status);
