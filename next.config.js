/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config();
// eslint-disable-line
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const withCSS = require('@zeit/next-css');

module.exports = withCSS({
	// cssModules: true,
	webpack: (config, { dev }) => {
		const customConfig = {
			...config,
		};

		customConfig.plugins = config.plugins.filter(
			(plugin) => plugin.constructor.name !== 'UglifyJsPlugin',
		);

		// Environment variables
		customConfig.plugins.push(new webpack.EnvironmentPlugin(process.env));

		if (dev) {
			customConfig.plugins.push(
				new StyleLintPlugin({
					configFile: './.stylelintrc.js',
					files: ['**/*.css'],
					// Errors are piped to Webpack's warning message handler
					emitErrors: false,
				}),
			);

			customConfig.module.rules.push({
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					// Errors are piped to Webpack's warning message handler
					emitWarning: true,
				},
			});
		}

		return customConfig;
	},
});
