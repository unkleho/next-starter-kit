import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
// import Link from '../components/Link';
import styles from './post.css';

class Post extends Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    // console.log(this.props.featuredMedia);
    const featuredImageUrl = this.props.featuredMedia && this.props.featuredMedia.sourceUrl;
    const authorName = this.props.author && this.props.author.name;
    const dateString = formatDate(this.props.date);

    return (
      <App>

        <article
          className="post-content antialiased container container--sm"
        >

          <header>
            <img src={featuredImageUrl} />
            <h1>{this.props.title}</h1>
            <div>By {authorName}</div>
            <div>{dateString}</div>
          </header>

          <div
            dangerouslySetInnerHTML={{ __html: this.props.content }}>
          </div>

        </article>

        <style jsx global>{styles}</style>
      </App>
    );
  }

}

// const Post = ({
//   // url,
//   title,
//   content,
// }) => (
//   <App>
//     <h1>{title}</h1>
//
//     <article
//       className="post-content antialiased container container--sm"
//       dangerouslySetInnerHTML={{ __html: content }}
//     ></article>
//
//     <style jsx global>{styles}</style>
//   </App>
// );

const postQuery = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
      title
      content
      featuredMedia {
        sourceUrl
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

const formatDate = (date) => {
  const d = new Date(Date.parse(date));
  return `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
};
