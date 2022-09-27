let config = {
	plugins: [require.resolve('prettier-plugin-multiline-arrays')],
	singleQuote: true,
	useTabs: true,
	tabWidth: 4,
	printWidth: 100,
	bracketSpacing: true,
	bracketSameLine: false,
	endOfLine: 'lf',
};

if (require.resolve('react')) {
	config = {
		...config,
		jsxSingleQuote: false,
	};
}

module.exports = config;
