/**
 * Checkis if package exists
 * 
 * @param { string } packageName 
 * @returns 
 */
function hasPackage(packageName) {
    try {
        return Boolean(require.resolve(packageName));
    } catch ( error ) {
        return false;
    }
}

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

if (hasPackage('react')) {
	config = {
		...config,
		jsxSingleQuote: false,
	};
}

module.exports = config;
