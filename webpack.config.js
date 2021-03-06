'use strict';
const webpack = require('webpack');
const path = require('path');
const pr = path.resolve;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const env = process.env.NODE_ENV;

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    })
];

let outputFilename = 'dist/bundle.js';

if (env === 'server') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
} else if (env === 'production') {
    plugins.push(new ExtractTextPlugin('dist/bundle_prod.css'));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        output: {comments: false}
    }));
    outputFilename = 'dist/bundle_prod.js';
} else {
    plugins.push(new ExtractTextPlugin('dist/bundle.css'));
}

const config = {
    entry: [
        pr(__dirname, 'src', 'index.js')
    ],
    output: {
        path: pr(__dirname, 'public'),
        publicPath: '',
        filename: outputFilename
    },
    resolve: {
        modules: ['node_modules', 'src']
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: ['node_modules'],
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            'compact': false,
                            'presets': [
                                'babel-preset-es2015', 
                                'babel-preset-stage-0',
                                'babel-preset-react'
                            ],
                            'plugins': [
                                'babel-plugin-transform-decorators-legacy',
                                'babel-plugin-transform-class-properties',
                            ],
                            'env': {
                                'server': {
                                    'presets': ['babel-preset-react-hot']
                                }
                            }
                        }
                    }
                ]
            },
            { 
                test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=fonts&publicPath=../fonts'
            },
            { 
                test: /\.(jpg|gif|png?)(\S+)?$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=images&publicPath=../images'
            },
            {
                test: /less|sass|\.s?css$/,
                exclude: ['node_modules'],
                loader: env !== 'server' ? ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            'css-loader?root=' + pr(__dirname, 'src'), 
                            'resolve-url-loader', 
                            'sass-loader'
                        ]
                    }
                ) : `style-loader!css-loader?root=${pr(__dirname, 'src')}!resolve-url-loader!sass-loader`
            }
        ]
    },
    plugins: plugins
};

if (env !== 'production') {
    config.devServer = {
        contentBase: pr(__dirname, 'public'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        compress: true,
        port: 9000    
    }
}

module.exports = config;