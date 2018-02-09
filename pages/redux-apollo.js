import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
	initStore,
	startClock,
	addCount,
	serverRenderClock,
} from '../lib/store';
import ExampleApp from '../components/examples/ExampleApp';
import withApollo from '../lib/withApollo';

class Index extends React.Component {
	static getInitialProps({ store, isServer }) {
		store.dispatch(serverRenderClock(isServer));
		store.dispatch(addCount());

		return { isServer };
	}

	componentDidMount() {
		// this.timer = this.props.startClock();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<ExampleApp>
				Hi {this.props.count}
				{this.props.objects.map((object) => <div>{object.displayTitle}</div>)}
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

const allObjects = gql`
	query objects {
		objects(limit: 10) {
			displayTitle
		}
	}
`;

export default withRedux(initStore, (state) => state, mapDispatchToProps)(
	withApollo(
		graphql(allObjects, {
			props: ({ data }) => {
				return {
					...data,
				};
			},
		})(Index),
	),
);
