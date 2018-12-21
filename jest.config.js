module.exports = {
	setupFiles: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	transform: {
		// Prevent 'Unexpected token import' errors
		'^.+\\.js$': 'babel-jest',
		// Ensure Jest can use next-css style imports eg. import './style.css'.
		'.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
		// Prevent css module parse errors
		'.*': '<rootDir>/node_modules/jest-css-modules',
	},
	moduleNameMapper: {
		// Bypass css for testing
		'.+\\.(css|styl|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
	},
};
