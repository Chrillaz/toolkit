const config = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	rules: {
		'block-spacing': 'error',
		'function-paren-newline': [
			'error',
			'multiline-arguments',
		],
		'keyword-spacing': 'error',
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

if (require.resolve('prettier')) {
	config.extends.push('plugin:prettier/recommended');

	config.rules = {
		...config.rules,
		'prettier/prettier': [
			'error',
			require.resolve('@chrillaz/prettier-config'),
		],
	};
}

if (require.resolve('typescript')) {
	config.overrides = [
		{
			extends: [
				require.resolve('./typescript'),
			],
		},
	];
}

if (require.resolve('react')) {
	config.extends.push('plugin:@chrillaz/eslint-plugin/react');
	if (hasTypescript) {
		config.overrides[0].extends.push(require.resolve('./react'));
	}
}

module.exports = config;
