import { Component } from 'react';

import AppBase from '../AppBase';

import '../../styles/base.css';
import '../../styles/helpers.css';

class App extends Component {
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
			<AppBase
				title={title}
				description={description}
				url={url}
				imageUrl={imageUrl}
				imageAlt={imageAlt}
				siteName={siteName}
			>
				{children}
			</AppBase>
		);
	}
}

export default App;
