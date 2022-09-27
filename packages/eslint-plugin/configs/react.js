module.exports = {
	extends: ['plugin:react/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'react',
		'react-hooks',
	],
	rules: {
		'react/prop-types': 'off',
		'react-hooks/rules-of-hook': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
