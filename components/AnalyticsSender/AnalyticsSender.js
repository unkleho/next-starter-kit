import { Component } from 'react';
import PropTypes from 'prop-types';

import { initGA, logPageView } from '../../lib/analytics';

class AnalyticsSender extends Component {
	static propTypes = {
		url: PropTypes.string,
	};

	componentDidMount() {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}

		logPageView();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.url !== this.props.url) {
			logPageView();
		}
	}

	render() {
		return null;
	}
}

export default AnalyticsSender;
