import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';

import './index.css';

export default (props) => (
	<ExampleApp>
		<Header pathname={props.url.pathname} />

		<h1>
			Next <span>Starter</span> Kit
		</h1>
	</ExampleApp>
);
