require('dotenv').config();
const webpack = require('webpack');
const fs = require('fs');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'UglifyJsPlugin',
    );

    // Environment variables
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    if (dev) {
      config.plugins.push(
        new StyleLintPlugin({
          configFile: './.stylelintrc.js',
          files: ['**/*.css'],
          emitErrors: false,
        }),
      );

      // FIXME: Getting hot-reloader errors if Flow catches something
      // Commented for now
      // config.plugins.push(new FlowBabelWebpackPlugin());
    }

    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    );

    return config;
  },
};
