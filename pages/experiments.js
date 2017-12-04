import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import DisplayTile from '../components/DisplayTile';
import SectionTitle from '../components/SectionTitle';
import { formatDate } from '../lib';
import { experiments } from '../lib/data';

class Experiments extends Component {

  render() {
    const {
      url,
      posts,
      loading: isLoading,
      loadMore,
    } = this.props;

    return (
      <App pathname={url.pathname} isLoading={isLoading}>

        <Masthead
          title={(
            <div>
              EXPERIMENTS<br/>
              <a href="https://twitter.com">#dxlab</a>
            </div>
          )}
          // text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
          backgroundImageUrl="/static/images/masthead-meridian-f.jpg"
          slug="EXPERIMENTS"
          size="md"
        />

        <div className="posts container container--lg">
          <SectionTitle>Explore our work</SectionTitle>

          {posts && (
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={posts.length < 46}
                loader={<div className="loader">Loading ...</div>}
            >
              {experiments.map((item, i) => (
                <DisplayTile
                  subtitle={item.date}
                  title={item.title}
                  url={`/blog/${item.slug}`}
                  imageUrl={item.imageUrl}
                  imageAltText={item.imageAltText}
                  content={item.content}
                  date={item.date}
                  size={i === 0 ? 'lg' : ''}
                  key={`tile-${i}`}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>

        {/* <style global jsx>{styles}</style> */}
      </App>
    );
  }

}

// TODO: Create totalPosts field in Graphql
const query = gql`
  query Posts($offset: Int) {
    posts(limit: 10, offset: $offset) {
      title
      slug
      excerpt
      date
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

export default withData(graphql(query, {
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
      posts: data && data.posts && data.posts.map((post) => {
        return {
          title: post.title,
          date: formatDate(post.date),
          content: post.excerpt,
          slug: post.slug,
          imageUrl: post.featuredMedia && post.featuredMedia.sizes.full.sourceUrl,
          imageAltText: post.featuredMedia && post.featuredMedia.sizes.full.altText,
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
})(Experiments));
