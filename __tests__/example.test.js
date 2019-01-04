/* eslint-env jest */

import { shallow, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import Router from 'next/router';
import ReactGA from 'react-ga';
import wait from 'waait';

import ExampleComponent from '../components/examples/ExampleComponent';
import { HomePage } from '../pages/index';
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

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

describe('With Enzyme', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const app = shallow(<ExampleComponent />);

		expect(app.find('p').text()).toEqual('Example Component');
	});

	it('Shows home page', () => {
		const app = shallow(<HomePage />);

		expect(app.find('h1').text()).toEqual('Next Starter Kit');
	});

	it('Shows example page, testing dotenv, Apollo data and next/router.', async () => {
		const wrapper = mount(
			<MockedWrapper>
				<ExamplePage />
			</MockedWrapper>,
		);

		// Test loading state
		expect(wrapper.find('[data-testid="graphql-objects"]').text()).toEqual('');

		// Wait for Apollo promise to resolve and get results
		await wait(0);

		expect(wrapper.find('.example-page__title').text()).toEqual('Page ');
		expect(wrapper.find('[data-testid="dotenv"]').text()).toEqual('test');
		expect(wrapper.find('[data-testid="graphql-objects"]').text()).toEqual(
			'Test 1Test 2',
		);

		// Simulate redux click
		expect(wrapper.find('.example-page__count-button').length).toEqual(1);
		wrapper.find('.example-page__count-button').simulate('click');
		expect(wrapper.find('.example-page__redux-count').text()).toEqual('1');

		// Simulate Next router link
		wrapper.find('.example-page__page-1-link').simulate('click');
		expect(Router.router.push.mock.calls[0][1]).toEqual('/example-page/1');

		if (GOOGLE_ANALYTICS_ID) {
			expect(ReactGA.initialize.mock.calls[0][0]).toEqual(GOOGLE_ANALYTICS_ID);
			expect(ReactGA.pageview.mock.calls[0][0]).toEqual('/');
		}

		// TODO:
		// - Add test for HeadMetaFields
	});

	it('Shows example page with id prop', () => {
		const wrapper = mount(
			<MockedWrapper>
				<ExamplePage id="1" />
			</MockedWrapper>,
		);

		expect(wrapper.find('.example-page__title').text()).toEqual('Page 1');
	});
});

describe('With Snapshot Testing', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const component = renderer.create(<ExampleComponent />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
