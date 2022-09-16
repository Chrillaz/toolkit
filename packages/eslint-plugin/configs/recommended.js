const config = {
	root: true,
	extends: [
		'eslint:recommended',
	],
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
