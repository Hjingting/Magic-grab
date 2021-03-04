const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'webpack 开发环境配置',
            template: path.resolve(__dirname, './public/index.html')
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // 'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'webpack-px-to-rem',
                        options: {
                            basePx: 100,
                            min: 1
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-withimg-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "url-loader?limit=10000&name=img/[hash:8].[name].[ext]",
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        outputPath: 'font',
                        name:'[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.md$/,
                use: [
                    "html-loader",
                    "markdown-loader"
                ]
            },
            {
                test: /\.js/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader?cacheDirectory',
                exclude: path.resolve(__dirname, 'node_modules')
            },
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        host: 'localhost',
        port: 8000,
        historyApiFallback: {
            disableDotRule: true
        },
        overlay: true,
        inline: true,
        stats: 'errors-only',
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api/': '/'
                }
            }
        }
    }
}