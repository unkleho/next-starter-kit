import { gql, graphql } from 'react-apollo';
import Masonry from 'react-masonry-component';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import Tile from '../components/Tile';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { experiments } from '../lib/data';
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
      <SectionTitle>Latest</SectionTitle>

      <Masonry
        className="featured-tiles"
        options={{
          percentPosition: true,
          itemSelector: '.tile',
          columnWidth: '.tile',
        }}
      >
        {posts && posts.slice(0, 5).map((post, i) => (
          <Tile
            title={post.title}
            url={`/blog/${post.slug}`}
            imageUrl={post.imageUrl}
            imageAltText={post.imageAltText}
            content={post.content}
            size={getTileSize(i)}
            experimentUrl={post.experimentUrl}
            blogUrl={`/blog/${post.slug}`}
            codeUrl={post.codeUrl}
            key={`tile-${i}`}
          />
        ))}
      </Masonry>

      <br/>

      <SectionTitle>Blog</SectionTitle>

      <div>
        {posts && posts.slice(5, 11).map((post, i) => (
          <SimpleTile
            title={post.title}
            url={`/blog/${post.slug}`}
            imageUrl={post.imageUrl}
            imageAltText={post.imageAltText}
            content={post.content}
            key={`simple-tile-${i}`}
          />
        ))}
      </div>

      <Button url="/blog">Read All Posts</Button>

      <br/>
      <br/>
      <br/>

      <SectionTitle>Experiments</SectionTitle>

      <Masonry
        className="experiment-tiles"
        options={{
          percentPosition: true,
          itemSelector: '.tile',
          columnWidth: '.tile',
        }}
      >
        {experiments && experiments.slice(0, 3).map((experiment, i) => (
          <Tile
            title={experiment.title}
            url={`/blog/${experiment.slug}`}
            imageUrl={experiment.imageUrl}
            imageAltText={experiment.imageAltText}
            content={experiment.content}
            size={getTileSize(i)}
            experimentUrl={experiment.experimentUrl}
            blogUrl={`/blog/${experiment.slug}`}
            codeUrl={experiment.codeUrl}
            key={`experiment-${i}`}
          />
        ))}
      </Masonry>

      <Button url="/experiments">All Experiments</Button>

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
    posts(limit: 13) {
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

        let experimentUrl;
        let blogUrl;
        let codeUrl;

        if (post.slug === 'building-painting-by-numbers' || post.slug === 'making-meridian') {
          experimentUrl = 'https://paintingbynumbers.dxlab.sl.nsw.gov.au';
        }

        if (post.slug === 'making-meridian') {
          codeUrl = 'https://github.com';
        }

        return {
          title: post.title,
          content: post.excerpt,
          slug: post.slug,
          imageUrl: post.featuredMedia && post.featuredMedia.sizes.full.sourceUrl,
          imageAltText: post.featuredMedia && post.featuredMedia.sizes.full.altText,
          experimentUrl,
          blogUrl,
          codeUrl,
        };
      }),
    };
  },
})(HomePage));
