/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import ExampleComponent from '../components/examples/ExampleComponent';

describe('With Enzyme', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const app = shallow(<ExampleComponent />);

		expect(app.find('p').text()).toEqual('Example Component');
	});
});

describe('With Snapshot Testing', () => {
	it('ExampleComponent shows "Example Component"', () => {
		const component = renderer.create(<ExampleComponent />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
