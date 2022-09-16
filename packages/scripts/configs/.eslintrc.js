const prettierConfig = require('./.prettierrc.js');
const { hasConsumerConfiguration, hasPackage } = require('../utilities');

const config = {
	env: {
		node: true,
		es6: true,
	},
	extends: ['plugin:@chrillaz/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['@chrillaz', 'prettier'],
	rules: {
		'prettier/prettier': ['error', prettierConfig],
	},
};

if (hasConsumerConfiguration('tsconfig')) {
	config.overrides = [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: [
				'plugin:@chrillaz/eslint-plugin/recommended',
				'plugin:@typescript-eslint/recommended',
				'prettier',
			],
			parser: '@typescript-eslint/parser',
			plugins: ['@chrillaz', '@typescript-eslint'],
		},
	];
}

if (hasPackage('react')) {
	config.extends.push('plugin:@chrillaz/eslint-plugin/react');
}

module.exports = config;
