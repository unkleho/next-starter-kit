import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Masonry from 'react-masonry-component';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import Tile from '../components/Tile';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { formatDate } from '../lib';
import styles from './index.css';

class HomePage extends Component {
  render() {
    const { url, posts, experiments, loading: isLoading } = this.props;
    return (
      <App
        pathname={url.pathname}
        isLoading={isLoading}
        title="Home"
        metaDescription="The State Library of NSW's experimental innovation lab."
      >
        <Masthead
          subtitle="Welcome to the DX Lab:"
          titleSmall="The State Library of NSW's"
          title="Experimental"
          titleHighlight="Innovation Lab"
          text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
          // sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
          backgroundImageUrl="/static/images/masthead-background-01.gif"
          slug="Experimental"
          size="lg"
          caption="Loom Atlas view"
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
            {posts &&
              posts.slice(0, 3).map((post, i) => (
                <Tile
                  title={post.title}
                  subtitle={post.date}
                  url={`/blog/${post.slug}`}
                  // target={post.experimentUrl ? '_blank' : ''}
                  primaryText="Read"
                  secondaryUrl={post.experimentUrl}
                  secondaryText="Launch"
                  secondaryTarget="_blank"
                  tertiaryText="Code"
                  tertiaryUrl={post.githubUrl}
                  tertiaryTarget="_blank"
                  imageUrl={
                    getTileSize(i) === '1x2'
                      ? post.tallImageUrl
                      : post.mediumImageUrl
                  }
                  imageAltText={post.imageAltText}
                  content={post.content}
                  size={getTileSize(i)}
                  key={`tile-${i}`}
                />
              ))}
          </Masonry>

          <br />

          <SectionTitle>Blog</SectionTitle>

          <div>
            {posts &&
              posts
                .slice(3, 7)
                .map((post, i) => (
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

          <Button href="/blog">Read All Posts</Button>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Masthead
          className="masthead--experiments"
          // subtitle="We make experiments"
          title="We make"
          titleHighlight="Experiments"
          backgroundImageUrl="/static/images/masthead-meridian-f.jpg"
          slug="We Make"
        />

        <div className="container container--lg">
          <SectionTitle>Check out our work!</SectionTitle>

          <Masonry
            className="experiment-tiles"
            options={{
              percentPosition: true,
              itemSelector: '.tile',
              columnWidth: '.tile',
            }}
          >
            {experiments &&
              swapArrayElements(experiments, 0, 1).map((experiment, i) => (
                <Tile
                  title={experiment.title}
                  subtitle={experiment.date}
                  url={experiment.url}
                  target="_blank"
                  primaryText="Launch"
                  secondaryText="Read"
                  secondaryUrl={experiment.blogUrl}
                  secondaryTarget=""
                  tertiaryText="Code"
                  tertiaryUrl={experiment.githubUrl}
                  tertiaryTarget="_blank"
                  imageUrl={
                    getExperimentTileSize(i) === '1x2'
                      ? experiment.tallImageUrl
                      : experiment.mediumImageUrl
                  }
                  imageAltText={experiment.imageAltText}
                  content={experiment.content}
                  size={getExperimentTileSize(i)}
                  key={`experiment-${i}`}
                />
              ))}
          </Masonry>

          <Button href="/experiments">All Experiments</Button>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <Masthead
          className="masthead--grants"
          title="We run"
          titleHighlight="Grants"
          text="To support creative and innovative thinking we offer dedicated digital grants, including the DX Lab Fellowship and the Digital Learning Fellowship."
          backgroundImageUrl="/static/images/masthead-bookman.jpg"
          slug="We run"
        />

        <div className="container container--lg">
          <Button href="/grants">Read about our grants</Button>
        </div>

        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
      </App>
    );
  }
}

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
      experiments {
        url
        githubUrl
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
    experiments(limit: 3) {
      title
      slug
      excerpt
      date
      url
      githubUrl
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

export default withData(
  graphql(homeQuery, {
    props: ({ data }) => {
      return {
        ...data,
        posts:
          data &&
          data.posts &&
          data.posts.map((item) => {
            return {
              ...mapItemToTile(item),
              experimentUrl: item.experiments[0] && item.experiments[0].url,
              githubUrl: item.experiments[0] && item.experiments[0].githubUrl,
              // blogUrl,
            };
          }),
        experiments:
          data.experiments &&
          data.experiments.map((item) => {
            return {
              ...mapItemToTile(item),
              url: item.url,
              blogUrl: item.posts[0] && `/blog/${item.posts[0].slug}`,
              githubUrl: item.githubUrl,
            };
          }),
      };
    },
  })(HomePage),
);

// TODO: Move to lib
function mapItemToTile(item) {
  return {
    title: item.title,
    content: item.excerpt,
    slug: item.slug,
    tallImageUrl:
      item.featuredMedia && item.featuredMedia.sizes.tallTile.sourceUrl,
    mediumImageUrl:
      item.featuredMedia && item.featuredMedia.sizes.mediumTile.sourceUrl,
    imageAltText: item.featuredMedia && item.featuredMedia.altText,
    date: formatDate(item.date),
  };
}

function swapArrayElements(a, x, y) {
  if (a.length === 1) return a;
  a.splice(y, 1, a.splice(x, 1, a[y])[0]);
  return a;
}
