import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
// import Link from '../components/Link';
import styles from './post.css';

const PostPage = ({
  // url,
  title,
  content,
}) => (
  <App>
    <h1>{title}</h1>

    <article className="post-content" dangerouslySetInnerHTML={{ __html: content }}></article>

    <style jsx global>{styles}</style>
  </App>
);

const postQuery = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
      title
      content
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
})(PostPage));
