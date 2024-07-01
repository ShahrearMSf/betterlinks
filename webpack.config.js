const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = {
	...defaultConfig,
	entry: {
		'betterlinks.core.min': './dev_betterlinks/index.js',
		'betterlinks-gutenberg.core.min': './dev_betterlinks/gutenberg/index.js',
		'betterlinks-cle.core.min': './dev_betterlinks/betterlinks-cle.js',
		'betterlinks-intflboards.core.min': './dev_betterlinks/integration/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'assets/js'),
		filename: '[name].js',
	},
	plugins: [...defaultConfig.plugins, new CleanWebpackPlugin()],
};

module.exports = config;
