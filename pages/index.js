import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import ExampleApp from '../components/examples/ExampleApp';
import Link from '../components/Link';
import Header from '../components/Header';
import proxyRoutes from '../routes/proxyRoutes';

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

    <ul>
      {Object.keys(proxyRoutes).map((route, i) => (
        <li>
            <a href={`${route}`} key={`posts-${i}`}>{route}</a>
        </li>
      ))}
    </ul>
  </ExampleApp>
);

const allObjects = gql`
  query {
    posts(limit: 10) {
      title
      slug
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
