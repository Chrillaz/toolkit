const config = {
	extends: [
		'plugin:@chrillaz/eslint-plugin/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	files: [
		'**/*.ts',
		'**/*.tsx',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@chrillaz',
		'@typescript-eslint',
	],
};

module.exports = config;
