import { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';

import './example-page.css';
import { initStore } from '../lib/store';
import withApollo from '../lib/withApollo';
import ExampleApp from '../components/examples/ExampleApp';
import Link from '../components/Link';
import Header from '../components/Header';
import ExampleComponent from '../components/examples/ExampleComponent';
import { exampleAction, addCount } from '../actions/exampleActions';

class ExamplePage extends Component {
	static propTypes = {
		id: PropTypes.string,
	};

	constructor() {
		super();

		this.state = {};
	}

	static getInitialProps({ query: { id = null }, store, isServer }) {
		store.dispatch(exampleAction('payload'));
		console.log(isServer);

		return {
			id,
		};
	}

	handleCountClick = () => {
		this.props.addCount();
	};

	render() {
		const { id, url, objects } = this.props;

		const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 'xxlg'];
		const colours = ['primary', 'secondary', 'tertiary', 'highlight'];

		return (
			<ExampleApp>
				<Header pathname={url.pathname} />

				<h1 className="title">
					Page <span>{id}</span>
				</h1>

				<h2>Style Guide</h2>
				<h3>Type Scale</h3>
				{sizes.map((size) => (
					<p
						className={`font-size-${size}`}
						key={`font-size-${size}`}
					>{`font-size-${size}`}</p>
				))}

				<h3>Colours</h3>
				{colours.map((colour) => (
					<div className="boxes" key={`boxes-${colour}`}>
						<h4>{colour}</h4>

						<div>
							{[...Array(7)].map((shade, i) => {
								return (
									<div
										className={`box box--colour-${colour}`}
										key={`box--colour-${colour}-${i}`}
									/>
								);
							})}
						</div>
					</div>
				))}

				<h2>Example Component</h2>
				<ExampleComponent title="Title" />

				<Link to="/example-page/1">
					<a>Example Page 1 Link</a>
				</Link>

				<h2>Redux Test</h2>
				<p>this.props.count: {this.props.count}</p>
				<a onClick={this.handleCountClick}>Click here to increase</a>

				<h2>dotenv Test</h2>
				<p>{process.env.TEST}</p>

				<h2>GraphQL Test</h2>
				<p>{process.env.GRAPHQL_URL}</p>
				<ul>
					{objects &&
						objects.map(({ displayTitle }, i) => {
							return <li key={i}>{displayTitle}</li>;
						})}
				</ul>
			</ExampleApp>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addCount: bindActionCreators(addCount, dispatch),
	};
};

const allObjects = gql`
	query {
		objects(limit: 10) {
			displayTitle
		}
	}
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withRedux(
	initStore,
	(state) => state.example,
	mapDispatchToProps,
)(
	withApollo(
		graphql(allObjects, {
			props: ({ data }) => {
				return {
					...data,
				};
			},
		})(ExamplePage),
	),
);
