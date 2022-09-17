const base = {
	plugins: [require.resolve('prettier-plugin-multiline-arrays')],
	singleQuote: true,
	useTabs: true,
	tabWidth: 4,
	printWidth: 100,
	bracketSpacing: true,
	bracketSameLine: false,
	endOfLine: 'lf',
};

const react = {
	jsxSingleQuote: false,
};

module.exports = {
	base,
	react,
};
