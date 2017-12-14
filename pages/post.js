import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import ShareBox from '../components/ShareBox';
import Button from '../components/Button';
import Comments from '../components/Comments';
import { formatDate } from '../lib';
import styles from './post.css';

class Post extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    featuredMedia: PropTypes.object,
    author: PropTypes.object,
    url: PropTypes.object,
    date: PropTypes.string,
    loading: PropTypes.bool,
    comments: PropTypes.array,
  }

  render() {
    const {
      id,
      title,
      content,
      featuredMedia,
      author,
      url,
      date,
      loading,
      comments,
      experiments,
    } = this.props;

    const featuredImageUrl = featuredMedia && featuredMedia.sourceUrl;
    const featuredImageDescription = featuredMedia && featuredMedia.description;
    const authorName = author && author.name;
    const experimentUrl = experiments && experiments[0] && experiments[0].url;
    const githubUrl = experiments && experiments[0] && experiments[0].githubUrl;
    const dateString = formatDate(date);

    return (
      <App isLoading={loading} pathname={url.pathname}>

        <article
          className="post container container--sm"
        >
          <div className="post__featured-image-holder">
            <img
              className="post__featured-image"
              src={featuredImageUrl}
              alt={featuredImageDescription}
            />
            <div className="post__date">{dateString}</div>
          </div>

          <header className="post__header">
            <h1 className="post__title">{title}</h1>
            <div className="post__author">By <a href="">{authorName}</a></div>

            <div className="post__cta">
              {experimentUrl && (
                <Button href="">LAUNCH EXPERIMENT</Button>
              )}
              {githubUrl && (
                <Button href="">CODE</Button>
              )}
            </div>
          </header>

          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: content }}>
          </div>

          <ShareBox pathname={url.pathname} />

          <Comments
            postId={id}
            comments={comments}
          />

        </article>

        <style jsx global>{styles}</style>
      </App>
    );
  }

}

const postQuery = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
      id
      title
      content
      featuredMedia {
        sourceUrl
        description
      }
      author {
        name
      }
      date
      comments {
        id
        content
        authorName
        date
        parentId
      }
      experiments {
        url
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(postQuery, {
  options: ({ url: { query: { slug } } }) => {
    // console.log(slug);
    return {
      variables: {
        slug,
      },
    };
  },
  props: ({ data }) => {
    const post = data.posts && data.posts[0];

    return {
      ...data,
      ...post,
    };
  },
})(Post));
