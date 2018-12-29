/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

module.exports = {
	plugins: [
		require('postcss-easy-import')({
			prefix: '_',
		}), // keep this first
		require('postcss-mixins'),
		require('postcss-preset-env')({
			stage: 0,
			features: {
				'color-mod-function': { unresolved: 'warn' },
			},
		}),
		require('lost'),
		require('postcss-reporter'),
	],
};
