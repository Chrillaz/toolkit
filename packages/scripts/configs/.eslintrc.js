const prettierConfig = require('./.prettierrc.js');
const { hasPackage } = require('../utilities/package');
const { consumer } = require('../utilities/paths.js');

const config = {
	env: {
		node: true,
		es6: true,
	},
	extends: ['plugin:@chrillaz/eslint-plugin/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['@chrillaz/eslint-plugin', 'prettier'],
	rules: {
		'prettier/prettier': ['error', prettierConfig],
	},
};

if (!!consumer.resolve('tsconfig')) {
	config.overrides = [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: [
				'plugin:@chrillaz/eslint-plugin/recommended',
				'plugin:@typescript-eslint/recommended',
				'prettier',
			],
			parser: '@typescript-eslint/parser',
			plugins: ['@chrillaz/eslint-plugin', '@typescript-eslint'],
		},
	];
}

if (hasPackage('react')) {
	config.extends.push('plugin:@chrillaz/eslint-plugin/react');
}

module.exports = config;
