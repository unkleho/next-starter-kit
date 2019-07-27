import React from 'react';

import App from '../../components/App';
import Header from '../../components/Header';

import '../index.css';

const ExampleIdPage = ({ router = {} }) => {
	return (
		<App title="Home" url={router.pathname}>
			<Header pathname={router.pathname} />
			<h1>Example Page {router.query.id}</h1>
		</App>
	);
};

export default ExampleIdPage;
