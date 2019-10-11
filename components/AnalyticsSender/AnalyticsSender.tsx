import * as React from 'react';

import { initGA, logPageView } from '../../lib/analytics';

type Props = {
	url?: string;
};

const AnalyticsSender: React.FunctionComponent<Props> = ({ url }) => {
	React.useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}

		logPageView();
	}, [url]);

	return null;
};

export default AnalyticsSender;
