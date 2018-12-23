import { Component } from 'react';

import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';

import './index.css';

export class HomePage extends Component {
	static defaultProps = {
		router: {},
	};

	render() {
		const { router } = this.props;

		return (
			<ExampleApp>
				<Header pathname={router.pathname} />

				<h1>
					Next <span>Starter</span> Kit
				</h1>
			</ExampleApp>
		);
	}
}

export default HomePage;
