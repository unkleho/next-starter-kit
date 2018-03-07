import { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
// import DisplayTile from '../components/DisplayTile';
import MainTile from '../components/MainTile';
import SectionTitle from '../components/SectionTitle';
import { formatDate } from '../lib';
import config from '../lib/config';

class Experiments extends Component {
  render() {
    const {
      url,
      loading: isLoading,
      // loadMore,
      experiments,
    } = this.props;

    return (
      <App
        pathname={url.pathname}
        isLoading={isLoading}
        title="Experiments"
        metaImageUrl={`${config.baseUrl}/static/images/masthead-meridian-f.jpg`}
      >
        <Masthead
          title="Experiments"
          // titleHighlight="#DXLAB"
          // text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
          backgroundImageUrl="/static/images/masthead-meridian-f.jpg"
          slug="Experiments"
          size="md"
          caption="Meridian: Miranda Globe"
        />

        <div className="posts container container--lg">
          <SectionTitle>Explore our work</SectionTitle>

          {experiments &&
            experiments.map((item, i) => (
              <MainTile
                subtitle={item.date}
                title={item.title}
                // TODO: This is hardcoded! Need to create field in GraphQL and Wordpress!
                size={getTileSize(item.slug)}
                // size={i === 0 || i === 1 || i === 2 ? 'lg' : ''}
                url={item.url}
                primaryText={'Launch'}
                primaryTarget={'_blank'}
                secondaryUrl={item.blogUrl}
                secondaryTarget={''}
                secondaryText={'Read'}
                tertiaryUrl={item.githubUrl}
                tertiaryText={'Code'}
                tertiaryTarget={'_blank'}
                imageUrl={item.imageUrl}
                imageAltText={item.imageAltText}
                content={item.content}
                date={item.date}
                key={`tile-${i}`}
              />
            ))}
        </div>

        {/* <style global jsx>{styles}</style> */}
      </App>
    );
  }
}

// TODO: Create totalPosts field in Graphql
const query = gql`
  query Experiments($offset: Int) {
    experiments(limit: 20, offset: $offset) {
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
          full {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default withData(
  graphql(query, {
    options: () => {
      return {
        variables: {
          offset: 0,
        },
      };
    },
    props: ({ data }) => {
      return {
        ...data,
        experiments:
          data &&
          data.experiments &&
          data.experiments.map((item) => {
            return {
              title: item.title,
              date: formatDate(item.date),
              content: item.excerpt,
              slug: item.slug,
              url: item.url,
              githubUrl: item.githubUrl,
              blogUrl: item.posts && `/blog/${item.posts[0].slug}`,
              imageUrl:
                item.featuredMedia && item.featuredMedia.sizes.full.sourceUrl,
              imageAltText:
                item.featuredMedia && item.featuredMedia.sizes.full.altText,
            };
          }),
        loadMore() {
          return data.fetchMore({
            variables: {
              offset: data.posts.length,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }

              return {
                ...previousResult,
                posts: [...previousResult.posts, ...fetchMoreResult.posts],
              };
            },
          });
        },
      };
    },
  })(Experiments),
);

// Very naughty bit of hard-coding here
function getTileSize(slug) {
  if (
    slug === 'painting-by-numbers' ||
    slug === 'unstacked' ||
    slug === 'loom'
  ) {
    return '1x2';
  }

  return '';
}
