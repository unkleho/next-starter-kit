import { Component } from 'react';

import AppBase from '../AppBase';

import '../../styles/base.css';
import '../../styles/helpers.css';

class App extends Component {
	render() {
		const {
			className,
			children,
			title,
			description,
			url,
			imageUrl,
			imageAlt,
			siteName,
		} = this.props;

		return (
			<AppBase
				className={className}
				title={title}
				description={description}
				url={url}
				imageUrl={imageUrl}
				imageAlt={imageAlt}
				siteName={siteName}
			>
				<div className={['app', className || '']}>{children}</div>
			</AppBase>
		);
	}
}

export default App;
