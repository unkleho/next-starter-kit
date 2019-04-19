import React from 'react';

import App from '../components/App';
import Header from '../components/Header';
// import { useWindowSize } from '../lib/hooks';

import './index.css';

const HomePage = ({ router = {} }) => {
	// Enzyme doesn't support Hooks yet. Re-enable once it does
	// or migrate to react-testing-library
	// const size = useWindowSize();

	// console.log(size);

	return (
		<App title="Home" url={router.pathname}>
			<Header pathname={router.pathname} />

			<h1>
				Next <span>Starter</span> Kit
			</h1>
		</App>
	);
};

export default HomePage;
