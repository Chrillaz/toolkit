const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const execRoot = fs.realpathSync(process.cwd());

const packageRoot = path.resolve(__dirname, '../');

const scriptsRoot = path.join(packageRoot, 'scripts');

const configsRoot = path.join(packageRoot, 'configs');

/**
 * 
 * @param scriptName string
 * @returns string
 */
function getScript(scriptName) {
	return path.join(scriptsRoot, scriptName);
}

/**
 * 
 * @param configName string
 * @returns string
 */
function getConfig(configName) {
	return path.join(configsRoot, configName);
}

/**
 * 
 * @param relPath string
 * @returns string
 */
function resolveExecPath(relPath) {
	return path.join(execRoot, relPath);
}

const consumer = {
	root: execRoot,
	resolve: resolveExecPath,
};

module.exports = {
	consumer,
	packageRoot,
	scriptsRoot,
	configsRoot,
	getPackageScript: getScript,
	getPackageConfig: getConfig,
};
