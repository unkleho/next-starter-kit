import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';

const HomePage = ({
  url,
  posts,
}) => (
  <ExampleApp>
    <Header pathname={url.pathname} />

    <h1>DX Lab</h1>
    {posts && posts.map(({ title }) => (
      <div>{title}</div>
    ))}
  </ExampleApp>
);

const allObjects = gql`
  query {
    posts(limit: 10) {
      title
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
})(HomePage));
