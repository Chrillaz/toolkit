const { base, react } = require('@chrillaz/prettier-config');
const { hasPackage } = require('../utilities/package');

const config = base;

if (hasPackage('react')) {
	Object.assign(config, react);
}

module.exports = config;