/* eslint-env jest */

import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import Router from 'next/router';
import ReactGA from 'react-ga';
import wait from 'waait';

import ExampleComponent from '../components/examples/ExampleComponent';
import HomePage from '../pages/index';
import ExamplePage, { GET_OBJECTS_QUERY } from '../pages/example-page';
import { initStore } from '../lib/store';

// Set up mocked Apollo query and data
const mocks = [
	{
		request: {
			query: GET_OBJECTS_QUERY,
			variables: {},
		},
		result: {
			data: {
				objects: [
					{
						displayTitle: 'Test 1',
					},
					{
						displayTitle: 'Test 2',
					},
				],
			},
		},
	},
];

// Set up Redux store
const store = initStore();

// Set up MockedWrapper component
export class MockedWrapper extends React.Component {
	render() {
		return (
			<MockedProvider mocks={mocks} addTypename={false}>
				<Provider store={store}>{this.props.children}</Provider>
			</MockedProvider>
		);
	}
}

const { GOOGLE_ANALYTICS_ID } = process.env;

afterEach(cleanup);

describe('ExampleComponent', () => {
	it('shows "Test"', () => {
		const { getByTestId } = render(<ExampleComponent title="Test" />);

		expect(getByTestId('title').innerHTML).toEqual('Test');
	});

	it('matches snapshot', () => {
		const component = renderer.create(<ExampleComponent />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('HomePage', () => {
	it('renders HomePage component', () => {
		const { getByText } = render(<HomePage />);

		expect(getByText('Starter')).toBeDefined();
	});
});

describe('ExamplePage', () => {
	it('renders ExamplePage, testing Redux, dotenv, Apollo data and next/router.', async () => {
		const props = ExamplePage.getInitialProps({
			query: { id: '1' },
			store,
			isServer: false,
		});

		const { getByTestId, getByText } = render(
			<MockedWrapper>
				<ExamplePage {...props} />
			</MockedWrapper>,
		);

		expect(getByTestId('title').textContent).toEqual('Page 1');
		expect(getByTestId('dotenv').textContent).toEqual('test');

		// Test loading state
		expect(getByTestId('graphql-objects').textContent).toEqual('');

		if (GOOGLE_ANALYTICS_ID) {
			expect(ReactGA.initialize.mock.calls[0][0]).toEqual(GOOGLE_ANALYTICS_ID);
			expect(ReactGA.pageview.mock.calls[0][0]).toEqual('/');
		}

		// Wait for Apollo promise to resolve and get results
		await wait(0);

		expect(getByTestId('graphql-objects').textContent).toEqual('Test 1Test 2');

		// Simulate redux counter click
		expect(getByTestId('count').textContent).toEqual('0');
		fireEvent.click(getByText('Click here to increase'));
		expect(getByTestId('count').textContent).toEqual('1');

		// Simulate Next router link
		fireEvent.click(getByText('Example Page 1 Link'));
		expect(Router.router.push.mock.calls[0][1]).toEqual('/example-page/1');
	});

	// TODO:
	// - Add test for HeadMetaFields
});
