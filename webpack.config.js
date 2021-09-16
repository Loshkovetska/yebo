const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./build/main.css",
                        }
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: './postcss.config.js' } }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: "./",
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },

                            optipng: {
                                enabled: false,
                            },

                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },

                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 15
                            }
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: __dirname,
            verbose: true,
            dry: false
        }
        ),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new HtmlWebpackPlugin(
            {
                title: 'webpack App',
                template: path.resolve(__dirname, './index.html'),
                filename: 'index.html'
            }
        )
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: 'build',
        compress: true,
        port: 8080
    }
};


module.exports = (env, args) => {
    const postLoader = {
        loader: "postcss-loader",

        options: {
            postcssOptions: {
                plugins: () => [
                    require("autoprefixer")()
                ]
            }
        }
    };

    const mode = args.mode || 'development';
    if (mode.includes('development')) {
        config.mode = 'development';
        config.devtool = 'source-map';
    }
    else {
        config.mode = 'production';
        config.module.rules[1].use.splice(2, 0, postLoader);
        config.optimization = {
            minimizer: [new UglifyJsPlugin()]
        }
    }
    return config;
};