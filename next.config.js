/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config();

const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

// const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const globalConfig = withCSS(
	withSass({
		webpack(config, { dev }) {
			const customConfig = {
				...config,
			};

			// Environment variables
			customConfig.plugins.push(new webpack.EnvironmentPlugin(process.env));

			// Issue with mini-css-extract-plugin throwing warnings about conflicting
			// order. This shouldn't matter for us because we are using CSS Modules.
			// Please remove if the issue gets resolved in future.
			// https://github.com/zeit/next-plugins/pull/315#issuecomment-457715973
			// customConfig.plugins.push(
			//   new FilterWarningsPlugin({
			//     exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
			//   })
			// );

			// Next 9 introduced some pretty strict type checking
			// that breaks dev builds. It is now more relaxed,
			// however we may want to introduce again once all types
			// issues fixed
			// https://github.com/zeit/next.js/issues/7687#issuecomment-506440999
			customConfig.plugins = config.plugins.filter((plugin) => {
				if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin')
					return false;
				return true;
			});

			if (dev) {
				/* eslint-disable */
				// const StyleLintPlugin = require('stylelint-webpack-plugin');
				/* eslint-enable */
				// customConfig.plugins.push(
				//   new StyleLintPlugin({
				//     configFile: './.stylelintrc.js',
				//     files: ['**/*.css', '**/*.scss'],
				//     emitErrors: false,
				//   })
				// );

				// Typescript and ESLint integration
				// https://github.com/facebook/create-react-app/issues/5641
				customConfig.module.rules.push({
					enforce: 'pre',
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					use: [
						{
							options: {
								formatter: require.resolve('react-dev-utils/eslintFormatter'),
								eslintPath: require.resolve('eslint'),
								parser: require.resolve('@typescript-eslint/parser'),
								emitWarning: true,
							},
							loader: require.resolve('eslint-loader'),
						},
					],
				});
			}

			return customConfig;
		},
		cssModules: true,
		cssLoaderOptions: {
			localIdentName: '[name]_[local]_[hash:base64:5]',
		},
	}),
);

module.exports = globalConfig;
