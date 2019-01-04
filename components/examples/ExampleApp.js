import Head from 'next/head';

import '../../styles/base.css';
import '../../styles/helpers.css';

export default ({ children }) => {
	return (
		<main>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{children}
		</main>
	);
};
