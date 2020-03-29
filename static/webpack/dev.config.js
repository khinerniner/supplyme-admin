const webpack = require('webpack');

module.exports = {

    mode: 'development',

    devtool: 'source-map',

    entry: [
        'webpack-hot-middleware/client',
        './src/index',
    ],

    output: {
        filename: 'bundle.js',
        publicPath: '/dist/',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                }],
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins() {
                            return [
                                require('precss'),
                                require('autoprefixer'),
                            ];
                        },
                    },
                }, {
                    loader: 'sass-loader',
                }],
            }, {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                }],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                PORT: '"3001"',
                NODE_ENV: '"development"',
                FIREBASE_BROWSER_KEY: '"AIzaSyAVsdLvWCtVoyKgriUWqsJ7rXucOsAXWrs"',
                SUPPLYME_ADMIN_KEY: '"SvaUdmV1XbLcuoqkDow8"',
                GOOGLE_API_KEY: '"AIzaSyAwKy9HM8mOHQ4t0wOrMW09w4MGucrfShA"'
            },
            __DEVELOPMENT__: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};
