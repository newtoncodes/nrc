'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const externals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;

const reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};

const reactDomExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
};

const reactDomServerExternal = {
    root: 'ReactDOMServer',
    commonjs2: 'react-dom/server',
    commonjs: 'react-dom/server',
    amd: 'react-dom/server'
};

const reactEventEmitterExternal = {
    root: 'EventEmitter',
    commonjs2: 'eventemitter3',
    commonjs: 'eventemitter3',
    amd: 'eventemitter3'
};

const reactSeamlessImmutableExternal = {
    root: 'SeamlessImmutable',
    commonjs2: 'seamless-immutable',
    commonjs: 'seamless-immutable',
    amd: 'seamless-immutable'
};


module.exports = {
    env : process.env.NODE_ENV,
    entry: {
        app: path.resolve(path.resolve(__dirname + '/src'), 'index.js')
    },
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'index.js',
        library: 'NRC',
        libraryTarget: 'commonjs2'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.css']
    },
    module: {
        noParse: /\.min\.js$/,

        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!less-loader?sourceMap&sourceMapContents')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
            },
            {test: /\.json?$/, loader: 'json'},
            {test: /\.svg$|\.woff$|\.ttf$|\.otf$|\.eot$|\.woff2$/, loader: 'url-loader?limit=1&name=[name].[ext]&root=.'},
            {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'url-loader?limit=1&name=[name].[ext]&root=.'},
            {test: /\.wav$|\.mp3|\.ogg$/, loader: 'url-loader?limit=1&name=[name].[ext]&root=.'}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new ExtractTextPlugin('styles.css', { allChunks: true })
    ],
    postcss: function () {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ];
    },
    externals: [externals({
        whitelist: []
    })],
    // externals: {
    //     'react': reactExternal,
    //     'react-dom': reactDomExternal,
    //     'react-dom/server': reactDomServerExternal,
    //     'eventemitter3': reactEventEmitterExternal,
    //     'seamless-immutable': reactSeamlessImmutableExternal,
    // },
    devtool: 'source-map'
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
}