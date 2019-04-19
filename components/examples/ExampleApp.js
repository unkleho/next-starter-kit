import { Fragment } from 'react';
import Head from 'next/head';

import HeadMetaFields from '../HeadMetaFields';

import '../../styles/base.css';
import '../../styles/helpers.css';

export default ({
	children,
	title,
	description,
	url,
	imageUrl,
	imageAlt,
	siteName,
	fbAppId,
	twitterUsername,
}) => {
	return (
		<Fragment>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<HeadMetaFields
					title={title}
					description={description}
					url={url}
					imageUrl={imageUrl}
					imageAlt={imageAlt}
					siteName={siteName}
					fbAppId={fbAppId}
					twitterUsername={twitterUsername}
				/>
			</Head>
			{children}
		</Fragment>
	);
};
