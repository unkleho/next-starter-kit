/* eslint-env jest */

import { shallow, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
// import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { withRouter } from 'next/router';

import ExampleComponent from '../components/examples/ExampleComponent';
import { HomePage } from '../pages/index';
import ExamplePage from '../pages/example-page';
// import { initStore } from '../lib/store';

describe('With Enzyme', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const app = shallow(<ExampleComponent />);

		expect(app.find('p').text()).toEqual('Example Component');
	});

	it('Shows home page', () => {
		const app = shallow(<HomePage />);

		expect(app.find('h1').text()).toEqual('Next Starter Kit');
	});

	it('Shows example page', () => {
		const mockStore = configureStore();
		const ExamplePageWithRouter = withRouter(ExamplePage);
		const store = mockStore({});

		// const app = renderer.create(
		// 	<MockedProvider>
		// 		<Provider store={store}>
		// 			<ExamplePageWithRouter />
		// 		</Provider>
		// 	</MockedProvider>,
		// );

		// const tree = app.toJSON();
		// expect(tree).toMatchSnapshot();

		const app = mount(
			<MockedProvider>
				<Provider store={store}>
					<ExamplePageWithRouter />
				</Provider>
			</MockedProvider>,
		);

		expect(app.find('.title').text()).toEqual('Page ');
	});
});

describe('With Snapshot Testing', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const component = renderer.create(<ExampleComponent />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
