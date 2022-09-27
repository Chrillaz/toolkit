/**
 * Checks if package exists
 * 
 * @param { string } packageName 
 * @returns boolean
 */
function hasPackage(packageName) {
    try {
        return Boolean(require.resolve(packageName));
    } catch ( error ) {
        return false;
    }
}

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

if (hasPackage('prettier')) {
	config.extends.push('plugin:prettier/recommended');

	config.rules = {
		...config.rules,
		'prettier/prettier': [
			'error',
			require.resolve('@chrillaz/prettier-config'),
		],
	};
}

if (hasPackage('typescript')) {
	config.overrides = [
		{
			extends: [
				require.resolve('./typescript'),
			],
		},
	];
}

if (hasPackage('react')) {
	config.extends.push('plugin:@chrillaz/eslint-plugin/react');
	if (hasTypescript) {
		config.overrides[0].extends.push(require.resolve('./react'));
	}
}

module.exports = config;
