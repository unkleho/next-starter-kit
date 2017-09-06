import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo'

import styles from './example-page.css';
import withData, { createApolloReduxStore } from '../lib/withData';
import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';
import ExampleComponent from '../components/examples/ExampleComponent';
import { exampleAction } from '../actions/exampleActions';

class ExamplePage extends Component {

  static propTypes = {
    id: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
    };
  }

  static getInitialProps ({ query: { id = null }, serverState }) {
    const store = createApolloReduxStore(serverState);
    store.dispatch(exampleAction('payload'));

    return {
      id,
    }
  }

  render() {
    const {
      id,
      url,
    } = this.props;

    console.log(this.props.data);

    const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 'xxlg'];
    const colours = ['primary', 'secondary', 'tertiary', 'highlight'];

    return(
      <ExampleApp>

        <Header pathname={url.pathname}></Header>

        <h1 className="title">Page <span>{id}</span></h1>

        <h2>Style Guide</h2>
        <h3>Type Scale</h3>
        {sizes.map(size => (
          <p className={`font-size-${size}`} key={`font-size-${size}`}>{`font-size-${size}`}</p>
        ))}

        <h3>Colours</h3>
        {colours.map(colour => (
          <div className="boxes" key={`boxes-${colour}`}>
            <h4>{colour}</h4>

            <div>
              {[...Array(7)].map((shade, i) => {
                return (
                  <div className={`box box--colour-${colour}`} key={`box--colour-${colour}-${i}`}></div>
                )
              })}
            </div>
          </div>
        ))}

        <h2>Example Component</h2>
        <ExampleComponent title="Title" />

        <h2>dotenv Test</h2>
        <p>{process.env.TEST}</p>

        <style jsx>{styles}</style>

      </ExampleApp>
    )
  }

}


const allPosts = gql`
  query {
    posts {
      title
      content
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default withData(graphql(allPosts, {
  options: {
    variables: {
      skip: 0,
      // first: POSTS_PER_PAGE
    }
  },
  props: ({ data }) => {

    console.log(data);

    return {
      data,
    }
    // loadMorePosts: () => {
    //   return data.fetchMore({
    //     variables: {
    //       skip: data.allPosts.length
    //     },
    //     updateQuery: (previousResult, { fetchMoreResult }) => {
    //       if (!fetchMoreResult) {
    //         return previousResult
    //       }
    //       return Object.assign({}, previousResult, {
    //         // Append the new posts results to the old one
    //         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
    //       })
    //     }
    //   })
    // }
  }
})(ExamplePage));
// export default withData(ExamplePage);
