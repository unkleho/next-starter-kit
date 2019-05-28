import React from 'react';

import App from '../components/App';
import Header from '../components/Header';
import { useWindowSize } from '../lib/hooks';

import './index.css';

const HomePage = ({ router = {} }) => {
	const size = useWindowSize();

	return (
		<App title="Home" url={router.pathname}>
			<Header pathname={router.pathname} />
			<h1>
				Next <span>Starter</span> Kit
			</h1>
			<h2>Window Size</h2>
			{size.width} {size.height}
		</App>
	);
};

export default HomePage;
