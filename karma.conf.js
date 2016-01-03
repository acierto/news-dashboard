var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// TODO merge main webpack config with karma's (see below)
// var webpackConfig = require('./webpack.config.js');

var browsers = ['Chrome'];
if ( /^win/.test(process.platform) ) {
  browsers = ['IE'];
}
if (process.env.TRAVIS ) {
  browsers = ['Firefox'];
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-ie-launcher'),
      require('karma-firefox-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader')
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
          { test: /\.css$/, loader: ExtractTextPlugin.extract('style!css?importLoaders=1') },
          { test: /\.scss$/, loader: ExtractTextPlugin.extract('style!css!sass?outputStyle=expanded') }
        ]
      },
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({
          'process.env': {
            // Signal production mode for React JS libs.
            NODE_ENV: JSON.stringify('test')
          }
        })
      ],
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    },

    // TODO merge karma.conf's webpack config and main app webpack config?
    // webpack: webpackConfig,

    webpackServer: {
      noInfo: true // don't spam console when running karma
    },

    webpackMiddleware: {
      stats: {
        colors: true
      }
    },

    // list of files / patterns to load in the browser
    files: [
//      'test/front-end/phantomjs-bind-polyfill.js',
      'test/front-end/*-spec.js'
    ],

    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/front-end/*.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
