import React from 'react';
import Router from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import ReactGA from 'react-ga';
import { render, cleanup, fireEvent } from '@testing-library/react';

import ExamplePage from '../pages/example';

const { GOOGLE_ANALYTICS_ID, TEST } = process.env;

afterEach(cleanup);

describe('ExamplePage', () => {
	it('renders ExamplePage, dotenv and next/router.', async () => {
		const { getByTestId, getByText } = render(
			<RouterContext.Provider
				value={{
					route: '/example',
					query: null,
					pathname: '/example',
					asPath: '/example',
				}}
			>
				<ExamplePage />
			</RouterContext.Provider>,
		);

		expect(getByText('Pathname: /example')).toBeDefined();

		if (TEST) {
			expect(getByTestId('dotenv').textContent).toEqual(TEST);
		}

		if (GOOGLE_ANALYTICS_ID) {
			expect(ReactGA.initialize.mock.calls[0][0]).toEqual(GOOGLE_ANALYTICS_ID);
			expect(ReactGA.pageview.mock.calls[0][0]).toEqual('/');
		}

		// Simulate Next router link
		fireEvent.click(getByText('Example Page 1 Link'));

		expect(Router.router.push.mock.calls[0][1]).toEqual('/example/1');
	});
});
