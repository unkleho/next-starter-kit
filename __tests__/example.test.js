/* eslint-env jest */

import { shallow, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import Router, { withRouter } from 'next/router';
import wait from 'waait';

import ExampleComponent from '../components/examples/ExampleComponent';
import { HomePage } from '../pages/index';
import ExamplePage, { GET_OBJECTS_QUERY } from '../pages/example-page';
import { initStore } from '../lib/store';

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
								__typename: 'object',
							},
							{
								displayTitle: 'Test 2',
								__typename: 'object',
							},
						],
					},
				},
			},
		];

		// Set up Redux store
		const store = initStore();

		// Wrap with withRouter to ensure router object exists
		const ExamplePageWithRouter = withRouter(ExamplePage);

		// Mount component, wrapping it with mocked Apollo and Redux providers
		const wrapper = mount(
			<MockedProvider mocks={mocks} addTypename={true}>
				<Provider store={store}>
					<ExamplePageWithRouter />
				</Provider>
			</MockedProvider>,
		);

		// Test loading state
		expect(wrapper.find('[data-id="graphql-objects"]').text()).toEqual('');

		// Wait for Apollo promise to resolve and get results
		await wait(0);

		expect(wrapper.find('.title').text()).toEqual('Page ');
		expect(wrapper.find('[data-id="dotenv"]').text()).toEqual('test');
		expect(wrapper.find('[data-id="graphql-objects"]').text()).toEqual(
			'Test 1Test 2',
		);

		// Simulate redux click
		expect(wrapper.find('.example-page__count-button').length).toEqual(1);
		wrapper.find('.example-page__count-button').simulate('click');
		expect(wrapper.find('.example-page__redux-count').text()).toEqual('1');

		// Simulate Next router link
		wrapper.find('.example-page__page-1-link').simulate('click');
		expect(Router.router.push.mock.calls[0][1]).toEqual('/example-page/1');
	});
});

describe('With Snapshot Testing', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const component = renderer.create(<ExampleComponent />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
