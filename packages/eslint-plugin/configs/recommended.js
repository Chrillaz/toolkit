const config = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'prettier',
	],
	plugins: [
		'@chrillaz',
		'prettier',
	],
	parserOptions: {
		sourceType: 'module',
        ecmaVersion: 'latest'
	},
	rules: {
		'block-spacing': 'error',
		'keyword-spacing': [
			'error',
			{
				before: true,
			},
		],
		'function-paren-newline': [
			'error',
			'multiline-arguments',
		],
		'no-prototype-builtins': 'error',
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: '*',
				next: 'return',
			},
		],
		'sort-imports': 'error',
		'sort-keys': 'error',
	},
};

module.exports = config;
