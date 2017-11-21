import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Tile from '../components/Tile';
import SectionTitle from '../components/SectionTitle';
// import proxyRoutes from '../routes/proxyRoutes';
import styles from './index.css';

const HomePage = ({
  url,
  posts,
}) => (
  <App pathname={url.pathname}>

    <div className="masthead">
      <div className="masthead__bg"></div>

      <div className="masthead__content">
        <h2>Welcome to the DX Lab:</h2>

        <h1><span>The State Library of NSW's</span><br/>
        Experimental<br/>
        Innovation Lab<br/>
        <a href="https://twitter.com">#dxlab</a></h1>

        <p className="masthead__intro-text">We build and support new ways of design thinking, experimentation and deep research with digital technologies.</p>

        <p className="masthead__intro-list">Collaborate / Experiment / Create / Engage / Be Open / Surprise</p>
      </div>
    </div>

    <div className="posts container container--lg">
      <SectionTitle title="Featured"></SectionTitle>

      <div>
        {posts && posts.map((post) => (
          <Tile
            title={post.title}
            slug={post.slug}
            imageUrl={post.imageUrl}
            imageAltText={post.imageAltText}
            content={post.content}
          />
        ))}
      </div>
    </div>


    {/* <h2>Experiments</h2>

    <div className="experiments">
      {proxyRoutes && Object.keys(proxyRoutes).map((route, i) => (
        <li>
            <a href={`${route}`} key={`posts-${i}`}>{route}</a>
        </li>
      ))}
    </div> */}

    <style jsx>{styles}</style>
  </App>
);

const homeQuery = gql`
  query {
    posts(limit: 10) {
      title
      slug
      excerpt
      featuredMedia {
        altText
        caption
        sizes {
          full {
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
          content: post.excerpt,
          slug: post.slug,
          imageUrl: post.featuredMedia.sizes.full.sourceUrl,
          imageAltText: post.featuredMedia.sizes.full.altText,
        };
      }),
    };
  },
})(HomePage));
