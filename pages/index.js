import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import Tile from '../components/Tile';
import SectionTitle from '../components/SectionTitle';
// import proxyRoutes from '../routes/proxyRoutes';
import styles from './index.css';

const HomePage = ({
  url,
  posts,
}) => (
  <App pathname={url.pathname}>

    <Masthead
      subtitle="Welcome to the DX Lab:"
      title={(
        <div>
          <span>The State Library of NSW's</span><br/>
          Experimental<br/>
          Innovation Lab<br/>
          <a href="https://twitter.com">#dxlab</a>
        </div>
      )}
      text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
      sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
      backgroundImageUrl="/static/images/masthead-background-01.gif"
      size="lg"
    >
    </Masthead>

    <div className="posts container container--lg">
      <SectionTitle title="Featured"></SectionTitle>

      <div>
        {posts && posts.map((post, i) => (
          <Tile
            title={post.title}
            url={post.url}
            slug={post.slug}
            imageUrl={post.imageUrl}
            imageAltText={post.imageAltText}
            content={post.content}
            key={`tile-${i}`}
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
