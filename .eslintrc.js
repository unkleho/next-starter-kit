module.exports = {
	parser: 'babel-eslint',
	extends: ['react-app', '@slnsw/dxlab', 'prettier'],
	plugins: ['prettier'],
	rules: {
		// 'comma-dangle': ['warn', 'always-multiline'],
		'react/react-in-jsx-scope': 0,
		// 'react/jsx-max-props-per-line': [1, { maximum: 3 }],
	},
};
