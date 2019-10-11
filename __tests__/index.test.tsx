import * as React from 'react';
import { render } from '@testing-library/react';

import HomePage from '../pages/index';

describe('Home Page', () => {
	it('Home Page rendered', () => {
		render(<HomePage />);
	});
});
