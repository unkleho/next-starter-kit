---
to: components/<%= name %>/<%= name %>.test.js
---
import * as React from 'react';
import { render, cleanup} from 'react-testing-library';

import <%= name %> from './<%= name %>';

afterEach(cleanup);

describe('<%= name %>', () => {
  it('<%= name %> component rendered', () => {
    render(<<%= name %>/>);
  });
});
