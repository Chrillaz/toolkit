const fs = require('fs');
const { getPackageValue } = require('./package');
const { consumer, getPackageConfig } = require('./paths');

const extensions = [
  '.js',
  '.json',
  'rc', 
  'rc.js',
  'rc.json',
  '.config.js', 
  '.config.json'
];

function resolve(configName, resolver) {
	return extensions.reduce((path, ext) => {
		if (!fs.existsSync(resolver(configName + ext))) {
			return path;
		}

		return resolver(configName + ext);
	}, '');
}

/**
 *
 * @param configName string
 * @returns
 */
function getConfig(configName) {
	if (getPackageValue(configName)) {
		return consumer.resolve('package.json');
	}

	const path = resolve(configName, (config) => consumer.resolve(config));

	if (path.length !== 0) {
		return path;
	}

	return resolve(configName, (config) => getPackageConfig(config));
}

/**
 *
 * @param configName string
 * @returns
 */
function hasConfig(configName) {
	return resolve(configName, (config) => consumer.resolve(config)).length !== 0;
}

module.exports = {
	getConfig,
  hasConfig
};
