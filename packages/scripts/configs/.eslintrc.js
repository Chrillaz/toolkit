const prettierConfig = require('./.prettierrc.js');
const { hasConsumerConfiguration, hasPackage } = require('../utilities');

const config = {
	extends: [
		'plugin:@chrillaz/recommended',
	],
	rules: {
		'prettier/prettier': [
			'error',
			prettierConfig,
		],
	},
};

const hasTypescript = hasConsumerConfiguration('tsconfig');

if (hasTypescript) {
	config.overrides = [
		{
			extends: [
				'plugin:@chrillaz/eslint-plugin/typescript',
			],
		},
	];
}

if (hasPackage('react')) {
	config.extends.push('plugin:@chrillaz/eslint-plugin/react');
	if (hasTypescript) {
		config.overrides[0].extends.push('plugin:@chrillaz/eslint-plugin/react');
	}
}

module.exports = config;
