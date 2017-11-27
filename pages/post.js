import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import ShareBox from '../components/ShareBox';
import { formatDate } from '../lib';
// import Link from '../components/Link';
import styles from './post.css';

class Post extends Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const featuredImageUrl = this.props.featuredMedia && this.props.featuredMedia.sourceUrl;
    const featuredImageDescription = this.props.featuredMedia && this.props.featuredMedia.description;
    const authorName = this.props.author && this.props.author.name;
    const dateString = formatDate(this.props.date);

    return (
      <App isLoading={this.props.loading}>

        <article
          className="post antialiased container container--md"
        >

          <header>
            <div className="post__featured-image-holder">
              <img
                className="post__featured-image"
                src={featuredImageUrl}
                alt={featuredImageDescription}
              />
              <div className="post__date">{dateString}</div>
            </div>
            <h1 className="post__title">{this.props.title}</h1>
            <div className="post__author">By <a href="">{authorName}</a></div>
          </header>

          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: this.props.content }}>
          </div>

          <ShareBox />

        </article>

        <style jsx global>{styles}</style>
      </App>
    );
  }

}

const postQuery = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
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
