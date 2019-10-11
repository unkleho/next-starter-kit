import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// import HeadMetaFields from '../HeadMetaFields';
import AnalyticsSender from '../AnalyticsSender';

import css from './App.scss';

type Props = {
	title?: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	siteName?: string;
	children?: string | React.ReactNode;
	className?: string;
};

const App: React.FunctionComponent<Props> = ({
	title,
	description,
	imageUrl,
	imageAlt,
	siteName,
	children,
	className,
}) => {
	const router = useRouter();
	const url = router && router.pathname;

	return (
		<div className={[css.app, className || ''].join(' ')}>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta property="og:type" content="website" />
				<link rel="icon" href="/favicon.ico" importance="low" />
				<title>{title}</title>

				{/* Note: Tried creating a component to place all these meta tags, but only worked server side */}
				{/* Facebook */}
				{title && <meta property="og:title" content={title} />}
				{description && (
					<meta property="og:description" content={description} />
				)}
				{description && <meta name="description" content={description} />}
				{imageUrl && <meta property="og:image" content={`${imageUrl}`} />}
				{url && <meta property="og:url" content={url} />}
				{siteName && <meta property="og:site_name" content={siteName} />}
				{process.env.FB_APP_ID && (
					<meta property="fb:app_id" content={process.env.FB_APP_ID} />
				)}

				{/* Twitter */}
				{title && <meta name="twitter:title" content={title} />}
				{description && (
					<meta name="twitter:description" content={description} />
				)}
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

			<AnalyticsSender url={url} />
			{children}
		</div>
	);
};

export default App;
