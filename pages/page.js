import { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
// import Link from '../components/Link';
import styles from './post.css';

class Page extends Component {

  render() {
    const {
      url: {
        query: {
          slug,
        },
      },
      content,
    } = this.props;

    return (
      <App pathname={`/${slug}`}>
        <Masthead
          title={(<div>{slug}<br/><a href="">#dxlab</a></div>)}
          backgroundImageUrl={images[slug]}
        >
        </Masthead>

        <article
          className="post-content antialiased container container--md" dangerouslySetInnerHTML={{ __html: content }}>
        </article>

        <style jsx global>{styles}</style>
      </App>
    );
  }

}

const query = gql`
  query Post($slug: String!) {
    pages(slug: $slug) {
      title
      content
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(query, {
  options: ({ url: { query: { slug } } }) => {
    return {
      variables: {
        slug,
      },
    };
  },
  props: ({ data }) => {
    const page = data.pages && data.pages[0];

    return {
      ...data,
      ...page,
    };
  },
})(Page));

const images = {
  about: '/static/images/masthead-loom-bg.jpg',
  experiments: '/static/images/masthead-meridian-f.jpg',
  fellowships: '/static/images/masthead-bookman.jpg',
  code: '/static/images/masthead-portico.jpg',
};
