/**
 * Webpack configuration
 */

const _ = require('lodash');
const prodConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = _.extend({}, prodConfig, {
  plugins: [
    // Manually do source maps to use alternate host.
    new webpack.SourceMapDevToolPlugin(
      'bundle.js.map',
      '\n//# sourceMappingURL=http://127.0.0.1:3001/build/js-dist/[url]')
  ]
});
