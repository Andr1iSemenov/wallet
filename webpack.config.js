const env = require('dotenv').config(); //load all defaults\common from .env
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const envFile = isProduction ? '.env.production' : '.env.development';
const envPath = path.resolve(__dirname, envFile);
const envVars = require('dotenv').config({ path: envPath }).parsed || {};

const mergedEnv = {
    ...env.parsed,
    ...envVars
}

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        }),
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(mergedEnv),
        }),
    ],
    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: {
            fs: false,
            'stream': require.resolve('stream-browserify'),
            'buffer': require.resolve('buffer'),
            'util': require.resolve('util'),
            'assert': require.resolve('assert'),
            'http': require.resolve('stream-http'),
            'url': require.resolve('url'),
            'https': require.resolve('https-browserify'),
            'os': require.resolve('os-browserify'),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve('crypto-browserify'),
            "zlib": false,
            "tls": false,
            "net": false,
            "querystring": require.resolve("querystring-es3"),
            "vm":require.resolve('vm-browserify'),
            "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify

        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

    } else {
        config.mode = 'development';
    }
    return config;
};