module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb-base', 'react-app', 'plugin:prettier/recommended'],
	rules: {
		'import/prefer-default-export': 0,
		'arrow-body-style': 0,
		'no-console': 0,
		'react/react-in-jsx-scope': 0,
		'class-methods-use-this': [
			'error',
			{
				exceptMethods: [
					'render',
					'getInitialState',
					'getDefaultProps',
					'getChildContext',
					'componentWillMount',
					'componentDidMount',
					'componentWillReceiveProps',
					'shouldComponentUpdate',
					'componentWillUpdate',
					'componentDidUpdate',
					'componentWillUnmount',
				],
			},
		],
	},
};
