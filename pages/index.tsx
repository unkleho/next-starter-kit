import React from 'react';
import Link from 'next/link';

import App from '../components/App';

import css from './index.scss';

const Home = () => (
	<App title="Home" className={css.home}>
		<h1>Next Starter Kit</h1>
		<Link href="/example">
			<a>Example Page</a>
		</Link>
	</App>
);

export default Home;
