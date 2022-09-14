const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { scriptsRoot } = require('./paths');
console.log(scriptsRoot)
const scripts = fs.readdirSync(scriptsRoot);
const argv = require('minimist')(process.argv.slice(2));

/**
 * Checks if given key exists in process argv
 *
 * @param arg string
 * @return boolean
 */
function hasArg(arg) {
	return arg in argv;
}

/**
 * Returns arg value if present
 *
 * @param key string
 * @return unknown | null
 */
function getArg(key) {
	return hasArg(key) ? argv[key] : null;
}

/**
 *
 */
function getPathArg() {
	return argv._;
}

/**
 * Returns minimist parsed argv
 *
 * @return object
 */
function getArgs() {
	const args = process.argv.slice(2);
	const scripts = getScripts();
	const scriptIndex = args.findIndex((arg) => scripts.includes(arg));

	return {
		nodeArgs: args.slice(0, scriptIndex),
		scriptName: args[scriptIndex],
		scriptArgs: args.slice(scriptIndex + 1),
	};
}

/**
 *
 * @param dir string
 * @returns Array
 */
function getScripts() {
	return scripts
		.map((script) => path.basename(script, path.extname(script)))
		.filter((name) => name.toLowerCase() !== 'index');
}

/**
 *
 * @param scriptName string
 * @returns boolean
 */
function hasScript(scriptName) {
	return getScripts().some((name) => name === scriptName);
}

/**
 * Validates given scriptname against supported scripts
 *
 * @param scriptName string
 * @returns scriptName || exit
 */
function validateScript(scriptName) {
	if (!scriptName) {
		console.log(
			'Ooops.. ' +
				'Looks like you forgot to pass which script to be executed ' +
				chalk.green(getScripts().join(' | '))
		);

		process.exit(1);
	}

	if (!hasScript(scriptName)) {
		console.log(
			'Ooops.. ' +
				chalk.red(scriptName) +
				' is not a valid script name. Maybee you meant to pass one of ' +
				chalk.green(getScripts().join(' | '))
		);

		process.exit(1);
	}

	return scriptName;
}

module.exports = {
  hasArg,
	getArg,
	getPathArg,
	getArgs,
	getScripts,
	hasScript,
	validateScript,
};
