import { gql, graphql } from 'react-apollo';
import Masonry from 'react-masonry-component';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import Tile from '../components/Tile';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
// import { experiments } from '../lib/data';
import { formatDate } from '../lib';
// import proxyRoutes from '../routes/proxyRoutes';
import styles from './index.css';

const HomePage = ({
  url,
  posts,
  experiments,
  loading: isLoading,
}) => (
  <App pathname={url.pathname} isLoading={isLoading}>

    <Masthead
      // subtitle="Welcome to the DX Lab:"
      title={(
        <div>
          <span>The State Library of NSW's</span><br/>
          Experimental<br/>
          Innovation Lab<br/>
          <a href="https://twitter.com">#dxlab</a>
        </div>
      )}
      text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
      // sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
      backgroundImageUrl="/static/images/masthead-background-01.gif"
      slug="Experimental Innovation Lab"
      size="lg"
    />

    <div className="posts container container--lg">
      <SectionTitle>Latest</SectionTitle>

      <Masonry
        className="featured-tiles"
        options={{
          percentPosition: true,
          itemSelector: '.tile',
          columnWidth: '.tile',
        }}
      >
        {posts && posts.slice(0, 3).map((post, i) => (
          <Tile
            title={post.title}
            subtitle={post.date}
            secondaryUrl={post.experimentUrl && `/blog/${post.slug}`}
            url={post.experimentUrl ? post.experimentUrl : `/blog/${post.slug}`}
            imageUrl={getTileSize(i) === '1x2' ? post.tallImageUrl : post.mediumImageUrl }
            imageAltText={post.imageAltText}
            content={post.content}
            size={getTileSize(i)}
            key={`tile-${i}`}
          />
        ))}
      </Masonry>

      <br/>

      <SectionTitle>Blog</SectionTitle>

      <div>
        {posts && posts.slice(3, 7).map((post, i) => (
          <SimpleTile
            subtitle={post.date}
            title={post.title}
            url={`/blog/${post.slug}`}
            imageUrl={post.mediumImageUrl}
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

      <Masthead
        // subtitle="We make experiments"
        title={(
          <div>
            We Make Experiments<br/>
            <a href="https://twitter.com">#dxlab</a>
          </div>
        )}
        // text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
        // sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
        backgroundImageUrl="/static/images/masthead-meridian-f.jpg"
        slug="We Make Experiments"
        size="lg"
      />

      <SectionTitle>Checkout our work!</SectionTitle>

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
            subtitle={experiment.date}
            url={experiment.url}
            secondaryUrl={experiment.blogUrl}
            tertiaryUrl={experiment.githubUrl}
            imageUrl={getExperimentTileSize(i) === '1x2' ? experiment.tallImageUrl : experiment.mediumImageUrl }
            imageAltText={experiment.imageAltText}
            content={experiment.content}
            size={getExperimentTileSize(i)}
            key={`experiment-${i}`}
          />
        ))}
      </Masonry>

      <Button url="/experiments">All Experiments</Button>

      <br />
      <br />
      <br />
      <br />
      <br />

      <Masthead
        title={(
          <div>
            WE RUN <a href="/fellowships">FELLOWSHIPS</a>
          </div>
        )}
        text="To support creative and innovative thinking we offer dedicated digital fellowships, the DX Lab Fellowship and the Digital Learning Fellowship."
        // sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
        backgroundImageUrl="/static/images/masthead-bookman.jpg"
        slug="WE RUN FELLOWSHIPS"
        size="lg"
      />

      <Button url="/fellowships">Read about our fellowships</Button>

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
  // } else if (index === 3) {
  //   return '2x1';
  }
}

function getExperimentTileSize(index) {
  if (index === 1 || index === 5) {
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
      date
      featuredMedia {
        altText
        caption
        sizes {
          tallTile {
            sourceUrl
          }
          mediumTile {
            sourceUrl
          }
          full {
            sourceUrl
          }
        }
      }
    }
    experiments(limit: 3) {
      title
      slug
      excerpt
      date
      url
      posts {
        slug
      }
      featuredMedia {
        altText
        caption
        sizes {
          tallTile {
            sourceUrl
          }
          mediumTile {
            sourceUrl
          }
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
      posts: data && data.posts && data.posts.map((item) => {

        let experimentUrl;
        let blogUrl;
        let codeUrl;

        // TODO: Remove this after API is updated
        if (item.slug === 'building-painting-by-numbers-2' || item.slug === 'making-meridian') {
          experimentUrl = 'https://paintingbynumbers.dxlab.sl.nsw.gov.au';
        }

        if (item.slug === 'making-meridian') {
          codeUrl = 'https://github.com';
        }

        return {
          ...mapItemToTile(item),
          experimentUrl,
          blogUrl,
          codeUrl,
        };
      }),
      experiments: data.experiments && data.experiments.map((item) => {
        return {
          ...mapItemToTile(item),
          url: item.url,
          blogUrl: item.posts[0] && `/blog/${item.posts[0].slug}`,
          githubUrl: item.githubUrl,
        };
      }),
    };
  },
})(HomePage));

function mapItemToTile(item) {
  return {
    title: item.title,
    content: item.excerpt,
    slug: item.slug,
    tallImageUrl: item.featuredMedia && item.featuredMedia.sizes.tallTile.sourceUrl,
    mediumImageUrl: item.featuredMedia && item.featuredMedia.sizes.mediumTile.sourceUrl,
    imageAltText: item.featuredMedia && item.featuredMedia.sizes.full.altText,
    date: formatDate(item.date),
  };
}
