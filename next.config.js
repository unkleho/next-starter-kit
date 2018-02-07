require('dotenv').config();
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  webpack: (config, { dev }) => {
    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    )

    // Environment variables
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )

    if (dev) {
      config.plugins.push(new StyleLintPlugin({
        configFile: './.stylelintrc.js',
        files: ['**/*.css'],
        emitErrors: false,
      }));

      // FIXME: Getting hot-reloader errors if Flow catches something
      // Commented for now
      // config.plugins.push(new FlowBabelWebpackPlugin());
    }

    return config
  }
});
