import App, { Container } from 'next/app';
import React from 'react';
// import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

// import withApolloClient from '../lib/withApolloClient';
import { initStore } from '../lib/store';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: Component.getInitialProps
				? await Component.getInitialProps(ctx)
				: {},
		};
	}

	render() {
		const {
			Component,
			pageProps,
			store,
			// apolloClient
		} = this.props;

		return (
			<Container>
				<Provider store={store}>
					{/* <ApolloProvider client={apolloClient}> */}
					<Component {...pageProps} />
					{/* </ApolloProvider> */}
				</Provider>
			</Container>
		);
	}
}

export default withRedux(initStore)(MyApp);
