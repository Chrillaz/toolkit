const { realpathSync, existsSync } = require('fs');
const path = require('path');

const configExtensions = [
	'',
	'rc',
	'.config',
];

const extensions = [
	'',
	'.js',
	'.ts',
	'.json',
];

const consumerRoot = realpathSync(process.cwd());

const packageRoot = path.join(__dirname, '../');

const scriptsRoot = path.join(packageRoot, 'scripts');

const configsRoot = path.join(packageRoot, 'configs');

const packageJson = require(path.join(consumerRoot, 'package.json'));

const resolvedPaths = new Map();

function resolve(key, resolver) {
	if (!resolvedPaths.has(key)) {
		const resolvedPath = resolver();
		if (resolvedPath) {
			resolvedPaths.set(key, resolver());
		}
	}

	return resolvedPaths.get(key);
}

/**
 *
 * @param { string } fileName
 * @param { (file: string) => string } resolver
 * @returns { string | undefined }
 */
function resolveConfiguration(fileName, resolver) {
	return configExtensions.reduce((path, confExt) => {
		const fileExtension = extensions.find((fileExt) =>
			existsSync(resolver(fileName + confExt + fileExt))
		);

		if (fileExtension) {
			return resolver(fileName + confExt + fileExtension);
		}

		return path;
	}, '');
}

/**
 *
 * @param packageName string
 * @returns boolean
 */
function hasPackage(packageName) {
	return (
		packageName in (packageJson.dependencies || {}) ||
		packageName in (packageJson.devDependencies || {})
	);
}

/**
 *
 * @param { string } key
 * @returns
 */
function hasKeyInPackage(key) {
	return key in packageJson;
}

/**
 *
 * @param { string } key
 * @returns
 */
function getKeyFromPackage(key) {
	return hasKeyInPackage(key) ? packageJson[key] : key;
}

/**
 *
 * @param { string } configName
 * @param {*} resolver
 * @returns
 */
function getConfiguration(configName, resolver) {
	return resolve(configName, () => resolveConfiguration(configName, resolver));
}

/**
 *
 * @param { string } relPath
 * @returns
 */
function getConsumerPath(relPath) {
	return path.join(consumerRoot, relPath);
}

/**
 *
 * @param { string } configName
 * @returns { string }
 */
function getConsumerConfiguration(configName) {
	return getConfiguration(configName, getConsumerPath);
}

/**
 *
 * @param { string } configName
 * @returns { boolean }
 */
function hasConsumerConfiguration(configName) {
	return hasKeyInPackage(configName) || !!getConsumerConfiguration(configName);
}

/**
 *
 * @param { string } scriptName
 * @returns
 */
function getPackagePath(relPath) {
	return path.join(packageRoot, relPath);
}

/**
 *
 * @param { string } relPath
 * @returns { string }
 */
function getPackageConfig(relPath) {
	return getPackagePath('configs/' + relPath);
}

/**
 *
 * @param { string } relPath
 * @returns { string }
 */
function getPackageScript(relPath) {
	return getPackagePath('scripts/' + relPath);
}

/**
 *
 * @param { string } configName
 * @returns
 */
function getPackageConfiguration(configName) {
	return getConfiguration(configName, getPackageConfig);
}

/**
 *
 * @param { string } configName
 * @returns
 */
function hasPackageConfiguration(configName) {
	return !!getPackageConfiguration(configName);
}

module.exports = {
	consumerRoot,
	scriptsRoot,
	configsRoot,
	hasPackage,
	hasKeyInPackage,
	getKeyFromPackage,
	getConsumerPath,
	hasConsumerConfiguration,
	getConsumerConfiguration,
	getPackagePath,
	getPackageConfig,
	getPackageScript,
	hasPackageConfiguration,
	getPackageConfiguration,
};
