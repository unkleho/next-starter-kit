import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';

import './example-page.css';
import ExampleApp from '../components/examples/ExampleApp';
import Link from '../components/Link';
import Header from '../components/Header';
import ExampleComponent from '../components/examples/ExampleComponent';
import { exampleAction, addCount } from '../actions/exampleActions';

class ExamplePage extends Component {
	static propTypes = {
		id: PropTypes.string,
		router: PropTypes.object,
		objects: PropTypes.array,
		addCount: PropTypes.func,
	};

	static defaultProps = {
		router: {},
	};

	static getInitialProps({ query: { id = null }, store, isServer }) {
		store.dispatch(exampleAction('payload'));
		console.log(isServer);

		return {
			id,
		};
	}

	constructor() {
		super();

		this.state = {};
	}

	handleCountClick = () => {
		this.props.addCount();
	};

	render() {
		const { id, router, objects, count } = this.props;

		const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 'xxlg'];
		const colours = ['primary', 'secondary', 'highlight', 'grey'];
		const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

		return (
			<ExampleApp>
				<Header pathname={router.pathname} />

				<h1 className="title">
					Page <span>{id}</span>
				</h1>

				<p className="example-page__router-pathname">{router.pathname}</p>

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
							{[...Array(10)].map((shade, i) => {
								return (
									<div
										className={`box box--colour-${colour}`}
										key={`box--colour-${colour}-${i}`}
										style={{
                      color: i >= 5 ? 'white' : 'inherit',
                    }}
									>
										{colour} {shades[i]}
									</div>
								);
							})}
						</div>
					</div>
				))}

				<h2>Example Component</h2>
				<ExampleComponent title="Title" />

				<Link to="/example-page/1">
					{/* eslint-disable jsx-a11y/anchor-is-valid */}
					<a className="example-page__page-1-link">Example Page 1 Link</a>
				</Link>

				<h2>Redux Test</h2>
				<p>
					this.props.count:{' '}
					<span className="example-page__redux-count">{count}</span>
				</p>
				<button
					className="example-page__count-button"
					onClick={this.handleCountClick}
				>
					Click here to increase
				</button>

				<h2>dotenv Test</h2>
				<p data-id="dotenv">{process.env.TEST}</p>

				<h2>GraphQL Test</h2>
				<p>{process.env.GRAPHQL_URL}</p>
				<ul data-id="graphql-objects">
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

export const GET_OBJECTS_QUERY = gql`
	query {
		objects(limit: 10) {
			displayTitle
		}
	}
`;

export default graphql(GET_OBJECTS_QUERY, {
	props: ({ data }) => {
		return {
			...data,
		};
	},
})(connect((state) => state.example, mapDispatchToProps)(ExamplePage));
