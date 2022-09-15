const { existsSync, realpathSync } = require('fs');
const path = require('path');

const execRoot = realpathSync(process.cwd());

const packageRoot = path.resolve(__dirname, '../');

const extensions = [
  '',
	'.js',
	'.ts',
	'.json',
	'rc',
	'rc.js',
	'rc.ts',
	'rc.json',
	'.config.js',
	'.config.ts',
	'.config.json',
];

/**
 *
 * @param { string } fileName
 * @param {(file: string) => string} resolver
 * @returns { string | undefined }
 */
function resolve(fileName, resolver) {
	const extension = extensions.find((ext) => existsSync(resolver(fileName + ext)));
  return resolver(fileName + extension);
}

/**
 *
 * @param { string } name
 * @returns { string }
 */
function resolvePathFromConsumer(name) {
	return resolve(name, (fileName) => path.join(execRoot, fileName));
}

/**
 *
 * @param { string } name
 * @returns { string }
 */
function resolveScriptPathFromPackage(name) {
	return path.join(packageRoot, 'scripts', name);
}

/**
 *
 * @param { string } name
 * @returns { string }
 */
function resolveConfigPathFromPackage(name) {
	return resolve(name, (fileName) => path.join(packageRoot, 'configs', fileName));
}

/**
 *
 * @param  { string[] } args
 * @returns { string | undefined }
 */
function resolveConfigurationPath(...args) {
	return args.find((path) => existsSync(path));
}
/**
 * Searches for configuration filepath
 *
 * @param { string } name
 * @param { string | undefined } pathFromCli
 * @returns { string }
 */
function getConfigPath(name, pathFromCli) {
	return resolveConfigurationPath(
		pathFromCli ? consumer.resolve(pathFromCli) : pathFromCli,
		resolvePathFromConsumer(name),
		resolveConfigPathFromPackage(name)
	);
}

module.exports = {
	consumer: {
		root: execRoot,
		resolve: resolvePathFromConsumer,
	},
	package: {
		root: packageRoot,
		config: resolveConfigPathFromPackage,
		script: resolveScriptPathFromPackage,
	},
	getConfigPath,
};
