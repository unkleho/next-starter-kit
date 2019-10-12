import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import HeadMeta from '../HeadMeta';
// import AnalyticsSender from '../AnalyticsSender';

import useAnalytics from '../../lib/hooks/useAnalytics';

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
	useAnalytics(url);

	return (
		<div className={[css.app, className || ''].join(' ')}>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta property="og:type" content="website" />
				<link rel="icon" href="/favicon.ico" importance="low" />
			</Head>

			<HeadMeta
				title={title}
				description={description}
				imageUrl={imageUrl}
				imageAlt={imageAlt}
				url={url}
				siteName={siteName}
			></HeadMeta>

			{/* <AnalyticsSender url={url} /> */}
			{children}
		</div>
	);
};

export default App;
