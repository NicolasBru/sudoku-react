var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                use: [
                    {
                      loader: 'babel-loader',
                      options: {
                        presets: [
                          [
                            '@babel/preset-env', {
                            'targets': {
                              'browsers': ['ie 10']
                            },
                            'loose': true
                          }
                          ],
                          '@babel/preset-react'
                        ]
                      }
                    }
                  ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    watch: true
};

module.exports = config;