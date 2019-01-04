import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// https://moz.com/blog/meta-data-templates-123

class HeadMetaFields extends Component {
	static propTypes = {
		title: PropTypes.string,
		description: PropTypes.string,
		imageUrl: PropTypes.string,
		imageAlt: PropTypes.string,
		url: PropTypes.string,
		siteName: PropTypes.string,
		fbAppId: PropTypes.string,
		twitterUsername: PropTypes.string,
	};

	render() {
		const {
			title,
			description,
			url,
			imageUrl,
			imageAlt,
			siteName,
			fbAppId,
			twitterUsername,
		} = this.props;

		return (
			<Fragment>
				<meta property="og:type" content="website" />

				{/* Facebook */}
				{title && <meta property="og:title" content={title} />}
				{description && (
					<meta property="og:description" content={description} />
				)}
				{description && <meta name="description" content={description} />}
				{imageUrl && <meta property="og:image" content={`${imageUrl}`} />}
				{url && <meta property="og:url" content={url} />}
				{siteName && <meta property="og:site_name" content={siteName} />}
				{fbAppId && <meta property="fb:app_id" content={fbAppId} />}

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				{title && <meta name="twitter:title" content={title} />}
				{description && (
					<meta name="twitter:description" content={description} />
				)}
				{twitterUsername && (
					<meta name="twitter:creator" content={twitterUsername} />
				)}
				{/* Twitter Summary card images must be at least 120x120px */}
				{imageUrl && <meta name="twitter:image" content={imageUrl} />}
				{imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
				{twitterUsername && (
					<meta name="twitter:site" content={twitterUsername} />
				)}
			</Fragment>
		);
	}
}

export default HeadMetaFields;
