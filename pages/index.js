import { gql, graphql } from 'react-apollo';
import Masonry from 'react-masonry-component';

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
  loading: isLoading,
}) => (
  <App pathname={url.pathname} isLoading={isLoading}>

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
      slug="Experimental Innovation Lab"
      size="lg"
    >
    </Masthead>

    <div className="posts container container--xlg">
      <SectionTitle>Featured</SectionTitle>

      <Masonry
        className="featured-tiles"
        options={{
          percentPosition: true,
          itemSelector: '.tile',
          columnWidth: '.tile',
        }}
      >
        {posts && posts.map((post, i) => (
          <Tile
            title={post.title}
            url={`/blog/${post.slug}`}
            imageUrl={post.imageUrl}
            imageAltText={post.imageAltText}
            content={post.content}
            size={getTileSize(i)}
            key={`tile-${i}`}
          />
        ))}
      </Masonry>
    </div>


    {/* <h2>Experiments</h2>

    <div className="experiments">
      {proxyRoutes && Object.keys(proxyRoutes).map((route, i) => (
        <li>
            <a href={`${route}`} key={`posts-${i}`}>{route}</a>
        </li>
      ))}
    </div> */}

    <style global jsx>{styles}</style>
  </App>
);

function getTileSize(index) {
  if (index === 0 || index === 5) {
    return '1x2';
  } else if (index === 3) {
    return '2x1';
  }
}

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
          imageUrl: post.featuredMedia && post.featuredMedia.sizes.full.sourceUrl,
          imageAltText: post.featuredMedia && post.featuredMedia.sizes.full.altText,
        };
      }),
    };
  },
})(HomePage));
