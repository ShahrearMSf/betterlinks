const path = require('path')

module.exports = (env, argv) => {
    let production = argv.mode === 'production'

    return {
        entry: {
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
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
    }
}
