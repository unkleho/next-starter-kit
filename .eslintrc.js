module.exports = {
	parser: 'babel-eslint',
	extends: [
		'react-app',
		// "airbnb-base", // TODO: Enable this laters
		'dxlab',
		'prettier',
	],
	plugins: ['prettier'],
	globals: {
		document: true,
		window: true,
		process: true,
	},
	rules: {
		'comma-dangle': ['warn', 'always-multiline'],
		'react/react-in-jsx-scope': 0,
		'react/jsx-max-props-per-line': [1, { maximum: 3 }],
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': 'error',
	},
};
