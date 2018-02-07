/* eslint global-require: 0 */

module.exports = {
	plugins: [
		require('postcss-easy-import')({
			prefix: '_',
		}), // keep this first
		require('postcss-mixins'),
		require('postcss-cssnext')({
			features: {
				autoprefixer: false, // Next.js already runs autoprefixer
			},
		}),
		require('lost'),
		// FIXME: cssnano messes with pseudo selectors
		// require('cssnano')()
		require('postcss-reporter'),
	],
};
