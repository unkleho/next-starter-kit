import { Component, Fragment } from 'react';
import Head from 'next/head';

// import HeadMetaFields from '../HeadMetaFields';
import AnalyticsSender from '../AnalyticsSender';

import '../../styles/base.css';
import '../../styles/helpers.css';

class AppBase extends Component {
	render() {
		const {
			children,
			title,
			description,
			url,
			imageUrl,
			imageAlt,
			siteName,
		} = this.props;

		return (
			<Fragment>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<meta property="og:type" content="website" />

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
					<meta name="twitter:card" content="summary_large_image" />
					{title && <meta name="twitter:title" content={title} />}
					{description && (
						<meta name="twitter:description" content={description} />
					)}
					{process.env.TWITTER_USERNAME && (
						<meta
							name="twitter:creator"
							content={process.env.TWITTER_USERNAME}
						/>
					)}
					{/* Twitter Summary card images must be at least 120x120px */}
					{imageUrl && <meta name="twitter:image" content={imageUrl} />}
					{imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
					{process.env.TWITTER_USERNAME && (
						<meta name="twitter:site" content={process.env.TWITTER_USERNAME} />
					)}
				</Head>

				<AnalyticsSender url={url} />
				{children}
			</Fragment>
		);
	}
}

export default AppBase;
