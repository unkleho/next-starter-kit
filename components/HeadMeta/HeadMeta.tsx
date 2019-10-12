import * as React from 'react';
import Head from 'next/head';

type Props = {
	title?: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	url?: string;
	siteName?: string;
};

const HeadMeta: React.FunctionComponent<Props> = ({
	title,
	description,
	imageUrl,
	imageAlt,
	url,
	siteName,
}) => {
	return (
		<Head>
			<title>{title}</title>

			{/* Facebook */}
			{title && <meta property="og:title" content={title} />}
			{description && <meta property="og:description" content={description} />}
			{description && <meta name="description" content={description} />}
			{imageUrl && <meta property="og:image" content={`${imageUrl}`} />}
			{url && <meta property="og:url" content={url} />}
			{siteName && <meta property="og:site_name" content={siteName} />}
			{process.env.FB_APP_ID && (
				<meta property="fb:app_id" content={process.env.FB_APP_ID} />
			)}

			{/* Twitter */}
			{title && <meta name="twitter:title" content={title} />}
			{description && <meta name="twitter:description" content={description} />}
			{process.env.TWITTER_USERNAME && (
				<meta name="twitter:creator" content={process.env.TWITTER_USERNAME} />
			)}
			{/* Twitter Summary card images must be at least 120x120px */}
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			{imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
			{imageUrl && <meta name="twitter:card" content="summary_large_image" />}
			{process.env.TWITTER_USERNAME && (
				<meta name="twitter:site" content={process.env.TWITTER_USERNAME} />
			)}
		</Head>
	);
};

export default HeadMeta;
