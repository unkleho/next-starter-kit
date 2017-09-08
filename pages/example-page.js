import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

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
      objects,
    } = this.props;

    // console.log(objects);

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

        <h2>GraphQL Test</h2>
        <p>{process.env.GRAPHQL_URL}</p>
        <ul>
          {objects && objects.map(({ displayTitle }, i) => {
            return (
              <li key={i}>{displayTitle}</li>
            )
          })}
        </ul>

        <style jsx>{styles}</style>

      </ExampleApp>
    )
  }

}

const allObjects = gql`
  query {
    objects(limit: 10) {
      displayTitle
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(allObjects, {
  props: ({ data }) => {
    return {
      ...data,
    }
  },
})(ExamplePage));
