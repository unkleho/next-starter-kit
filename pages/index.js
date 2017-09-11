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

    <h2>Posts</h2>

    <ul>
    {posts && posts.map(({ title, slug, image }, i) => (
      <li>
        <Link to={`/post/${slug}`} key={`posts-${i}`}>
          <a>
            <img src={image.url} alt={image.altText} />
            <h2>{title}</h2>
          </a>
        </Link>
      </li>
    ))}
    </ul>

    <h2>Experiments</h2>

    <ul>
      {Object.keys(proxyRoutes).map((route, i) => (
        <li>
            <a href={`${route}`} key={`posts-${i}`}>{route}</a>
        </li>
      ))}
    </ul>
  </ExampleApp>
);

const homeQuery = gql`
  query {
    posts(limit: 10) {
      title
      slug
      featuredMedia {
        altText
        caption
        sizes {
          thumbnail {
            sourceUrl
          }
        }
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(homeQuery, {
  props: ({ data }) => {
    return {
      ...data,
      posts: data.posts.map((post) => {
        return {
          title: post.title,
          slug: post.slug,
          image: {
            url: post.featuredMedia.sizes.thumbnail.sourceUrl,
            altText: post.featuredMedia.sizes.thumbnail.altText,
          },
        }
      }),
    }
  },
})(HomePage));
