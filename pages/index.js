import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';
import withData from '../lib/withData';

import './index.css';

export default withData((props) => (
	<ExampleApp>
		<Header pathname={props.url.pathname} />

		<h1>
			Next <span>Starter</span> Kit
		</h1>
	</ExampleApp>
));
