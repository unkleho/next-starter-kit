import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import {
	initStore,
	startClock,
	addCount,
	serverRenderClock,
} from '../lib/store';
import ExampleApp from '../components/examples/ExampleApp';
// import Header from '../components/Header';
// import Page from '../components/Page';
// import Submit from '../components/Submit';
// import PostList from '../components/PostList';
import withApollo from '../lib/withApollo';

class Index extends React.Component {
	static getInitialProps({ store, isServer }) {
		store.dispatch(serverRenderClock(isServer));
		store.dispatch(addCount());

		return { isServer };
	}

	componentDidMount() {
		this.timer = this.props.startClock();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		console.log(this.props);
		return (
			<ExampleApp>
				Hi {this.props.count}
				{/* <Header />
				<Page title="Index" />
				<Submit />
				<PostList /> */}
			</ExampleApp>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addCount: bindActionCreators(addCount, dispatch),
		startClock: bindActionCreators(startClock, dispatch),
	};
};

export default withRedux(initStore, (state) => state, mapDispatchToProps)(
	withApollo(Index),
);
