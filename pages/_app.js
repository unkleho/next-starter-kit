import App, { Container } from 'next/app';
import React from 'react';
// import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { withRouter } from 'next/router';

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
		const { Component, pageProps, store, router } = this.props;

		// console.log(this.props);

		return (
			<Container>
				<Provider store={store}>
					{/* <ApolloProvider client={apolloClient}> */}
					<Component {...pageProps} router={router} />
					{/* </ApolloProvider> */}
				</Provider>
			</Container>
		);
	}
}

export default withRedux(initStore)(withRouter(MyApp));
