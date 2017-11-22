import { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
// import Link from '../components/Link';
import styles from './post.css';

class Page extends Component {

  render() {
    const {
      url: {
        query: {
          slug,
        },
        // pathname,
      },
      content,
    } = this.props;

    return (
      <App pathname={`/${slug}`}>
        <h1>{slug}</h1>

        <article className="post-content" dangerouslySetInnerHTML={{ __html: content }}></article>

        <style jsx global>{styles}</style>
      </App>
    );
  }

}

// const Page = ({
//   url,
//   // title,
//   content,
// }) => (
//   <App pathname={url.pathname}>
//     <h1>{url.pathname}</h1>
//
//     <article className="post-content" dangerouslySetInnerHTML={{ __html: content }}></article>
//
//     <style jsx global>{styles}</style>
//   </App>
// );

const query = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
      title
      content
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(query, {
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
})(Page));