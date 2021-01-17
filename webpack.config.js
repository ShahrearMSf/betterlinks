const path = require('path');

module.exports = (env, argv) => {
	let production = argv.mode === 'production';

	return {
		entry: {
			// 'js/betterlinks-core': path.resolve(__dirname, 'src/index.js'),
			'js/betterlinks-core.min': path.resolve(__dirname, 'src/index.js'),
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'assets'),
		},

		devtool: production ? '' : 'source-map',

		resolve: {
			extensions: ['.js', '.jsx', '.json'],
		},

		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
	};
};
