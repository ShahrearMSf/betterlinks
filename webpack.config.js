const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = {
	...defaultConfig,
	entry: {
		'betterlinks.core.min': './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'assets/js'),
		filename: '[name].js',
		chunkFilename: 'betterlinks.[id].chunk.js',
	},
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			defaultVendors: {
	// 				test: /[\\/]node_modules[\\/](react-chartjs-2|moment|chartjs)[\\/]/,
	// 				chunks: 'all',
	// 			},
	// 		},
	// 	},
	// },
	// plugins: [new CleanWebpackPlugin()],
};

module.exports = config;
