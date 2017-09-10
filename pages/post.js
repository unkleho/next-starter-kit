import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import ExampleApp from '../components/examples/ExampleApp';
import Link from '../components/Link';
import Header from '../components/Header';

const HomePage = ({
  url,
  posts,
}) => (
  <ExampleApp>
    <Header pathname={url.pathname} />

    <h1>DX Lab</h1>

    <Link to='/example-page/1'>
      <a>Example Page 1</a>
    </Link>

    <ul>
    {posts && posts.map(({ title, slug }, i) => (
      <li>
        <Link to={`/posts/${slug}`} key={`posts-${i}`}>
          <a>{title}</a>
        </Link>
      </li>
    ))}
    </ul>
  </ExampleApp>
);

const allObjects = gql`
  query {
    post($id: Int!) {
      title
      slug
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(allObjects, {
  options: {
    variables: {
      skip: 0,
    }
  },
  props: ({ data }) => {
    return {
      ...data,
    }
  },
})(HomePage));
