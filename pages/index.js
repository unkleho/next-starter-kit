import { gql, graphql } from 'react-apollo';
// import css from 'styled-jsx/css';

import withData from '../lib/withData';
import ExampleApp from '../components/examples/ExampleApp';
import Link from '../components/Link';
import Header from '../components/Header';
import proxyRoutes from '../routes/proxyRoutes';
import styles from './index.css';

const HomePage = ({
  url,
  posts,
}) => (
  <ExampleApp>
    <Header pathname={url.pathname} />

    <div className="masthead"></div>

    <div className="posts">
      {posts && posts.map(({ title, slug, image }, i) => (
        <article key={`posts-${i}`}>
          <Link to={`/post/${slug}`}>
            <a>
              <img src={image.url} alt={image.altText} />
              <h2>{title}</h2>
            </a>
          </Link>
        </article>
      ))}
    </div>


    <h2>Experiments</h2>

    <div className="experiments">
      {proxyRoutes && Object.keys(proxyRoutes).map((route, i) => (
        <li>
            <a href={`${route}`} key={`posts-${i}`}>{route}</a>
        </li>
      ))}
    </div>

    <style jsx>{styles}</style>
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
      posts: data && data.posts && data.posts.map((post) => {
        return {
          title: post.title,
          slug: post.slug,
          image: {
            url: post.featuredMedia.sizes.thumbnail.sourceUrl,
            altText: post.featuredMedia.sizes.thumbnail.altText,
          },
        };
      }),
    };
  },
})(HomePage));
