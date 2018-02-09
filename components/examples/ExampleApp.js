import Head from 'next/head';

import '../../styles/base.css';
import '../../styles/helpers.css';

export default ({ children }) => (
	<main>
		<Head>
			{/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
		</Head>
		{children}
	</main>
);
