import React from 'react';
import { useRouter } from 'next/router';

import ExamplePage from './index';

const ExampleIdPage = () => {
	const router = useRouter();

	return <ExamplePage id={router.query.id}></ExamplePage>;
};

export default ExampleIdPage;
