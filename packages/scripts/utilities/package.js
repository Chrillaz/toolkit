const { consumer } = require('./paths');

const packageJson = require(consumer.resolve('package.json'));

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
 * @param key string
 * @returns string || null
 */
function getPackageValue(key) {
	if (key in packageJson) {
		return packageJson[key];
	}
}

module.exports = {
	hasPackage,
	getPackageValue,
};
