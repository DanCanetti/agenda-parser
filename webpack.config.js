const path                  = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack               = require('webpack');

module.exports = (env) => {

    new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV,
    });

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            filename: 'parse.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'agenda-csv-parser.css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: "./"
                            },
                        },
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: 'compressed',
                                },
                            },
                        },
                    ],

                },
            ],
        },
    };
};