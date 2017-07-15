const fs = require('fs')
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    )

    // FIXME: UnhandledPromiseRejectionWarning error
    config.plugins.push(new StyleLintPlugin({
      files: ['**/*.css'],
      emitErrors: false,
      // failOnError: false,
    }));

    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.css$/,
        use: ["babel-loader", "raw-loader", "postcss-loader"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      }
    )

    return config
  }
}
