/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import ExampleComponent from '../components/examples/ExampleComponent';
import { HomePage } from '../pages/index';

describe('With Enzyme', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const app = shallow(<ExampleComponent />);

		expect(app.find('p').text()).toEqual('Example Component');
	});

	it('Shows home page', () => {
		const app = shallow(<HomePage />);

		expect(app.find('h1').text()).toEqual('Next Starter Kit');
	});
});

describe('With Snapshot Testing', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const component = renderer.create(<ExampleComponent />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
