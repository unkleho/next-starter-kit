import Head from 'next/head';

import '../../styles/base.css';
import '../../styles/helpers.css';

export default ({ children }) => (
	<main>
		<Head>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			{/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
		</Head>
		{children}
	</main>
);
