import { Component } from 'react';

import App from '../components/App';
import Header from '../components/Header';

import './index.css';

export class HomePage extends Component {
	static defaultProps = {
		router: {},
	};

	render() {
		const { router } = this.props;

		return (
			<App title="Home" url={router.pathname}>
				<Header pathname={router.pathname} />

				<h1>
					Next <span>Starter</span> Kit
				</h1>
			</App>
		);
	}
}

export default HomePage;
