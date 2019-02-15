const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, './src/components/common'),
            '@actions': path.resolve(__dirname, './src/actions'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                          modules: true,
                          sourceMap: true,
                          importLoaders: 1,
                          localIdentName: '[name]__[local]___[hash:base64:5]',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [autoprefixer],
                        },
                    },
                    "sass-loader",
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            inject: false,
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: "[name].css",
        }),
    ],
    devtool: 'source-map',
};

module.exports = config;
