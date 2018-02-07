import { ApolloClient, createNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch;
}

function create() {
	return new ApolloClient({
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		networkInterface: createNetworkInterface({
			uri: process.env.GRAPHQL_URL || 'https://api.maas.museum',
			// Server URL (must be absolute)
			opts: {
				// Additional fetch() options like `credentials` or `headers`
				credentials: 'same-origin',
			},
		}),
	});
}

export default function initApollo() {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create();
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create();
	}

	return apolloClient;
}
