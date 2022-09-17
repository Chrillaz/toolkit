const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const babelOptions = require("../configs/babel.options");
const browserslist = require('browserslist');

const {
	hasPackage,
	getConsumerPath,
	hasConsumerConfiguration,
	getPackageConfiguration,
} = require('../utilities');

const isDevelopment = process.env.NODE_ENV !== 'production';

const context = getConsumerPath('.');

const isTypescriptProject = hasConsumerConfiguration('tsconfig');

const hasReact = hasPackage('react');

const extensions = [
	'.js',
	'.ejs',
];

if (isTypescriptProject) {
	extensions.push('.ts');
}

if (hasReact) {
	extensions.push('.jsx');
	if (isTypescriptProject) {
		extensions.push('.tsx');
	}
}

const devServer = {
	static: getConsumerPath('public'),
	compress: true,
	hot: true,
	port: '3000',
	historyApiFallback: hasPackage('react'),
};

const optimization = {
	minimize: !isDevelopment,
	minimizer: [
		new TerserPlugin({
			terserOptions: {
				compress: {
					ecma: 6,
					warnings: false,
					comparisons: false,
					inline: 2,
				},
				keep_classnames: isDevelopment,
				keep_fnames: isDevelopment,
				mangle: {
					safari10: true,
				},
				output: {
					ecma: 6,
					comments: false,
					ascii_only: true,
				},
			},
		}),
	],
};

const plugins = [
	new HTMLWebpackPlugin({
		inject: 'body',
		template: getConsumerPath('public/index.html'),
	}),
];

let target = 'browserslist';
if (!browserslist.findConfig('.')) {
	target += `:${require.resolve(getPackageConfiguration('.browserslist'))}`;
}

const config = {
	context,
	// target,
	devServer,
	devtool: isDevelopment ? 'inline-source-map' : 'source-map',
	entry: getConsumerPath('src'),
	output: {
		filename: '[name].js',
		path: getConsumerPath('dist'),
		publicPath: '/',
	},
	optimization,
	resolve: {
		extensions,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve('babel-loader'),
					options: {
						compact: !isDevelopment,
						...babelOptions,
					},
				},
			},
		],
	},
	plugins: plugins.filter(Boolean),
};

module.exports = config;
