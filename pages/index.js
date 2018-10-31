import { withRouter } from 'next/router';

import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';

import './index.css';

export default withRouter((props) => (
	<ExampleApp>
		<Header pathname={props.router.pathname} />

		<h1>
			Next <span>Starter</span> Kit
		</h1>
	</ExampleApp>
));
