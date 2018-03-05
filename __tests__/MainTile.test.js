/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import MainTile from '../components/MainTile';

describe('With Enzyme', () => {
  it('MainTile shows "Main Tile Title"', () => {
    const app = shallow(<MainTile title="Main Tile Title" />);

    expect(app.find('h1 a').text()).toEqual('Main Tile Title');
  });
});

describe('With Snapshot Testing', () => {
  it('MainTile shows "Main Tile Title"', () => {
    const component = renderer.create(<MainTile />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
