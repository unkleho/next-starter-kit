import { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import styles from './post.css';

class Page extends Component {

  render() {
    const {
      title,
      url,
      content,
      excerpt,
      loading: isLoading,
    } = this.props;

    const slug = url.pathname.substr(1);

    return (
      <App
        pathname={`/${slug}`}
        isLoading={isLoading}
        title={title}
        metaDescription={excerpt}
      >
        <Masthead
          title={(<div>{slug}<br/><a href="https://twitter.com/hashtag/dxlab">#dxlab</a></div>)}
          backgroundImageUrl={images[slug].imageUrl}
          slug={slug}
          caption={images[slug].caption}
        >
        </Masthead>

        <article className="post antialiased container container--md">
          <div
            className="post__content" dangerouslySetInnerHTML={{ __html: content }}>
          </div>
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
      excerpt
      content
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(query, {
  options: ({ url: { pathname } }) => {
    const slug = pathname.substr(1);

    return {
      variables: {
        // TODO: Remove this once DB has been updated
        slug: slug === 'grants' ? 'fellowships' : slug,
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
  about: {
    imageUrl: '/static/images/masthead-loom-bg.jpg',
    url: 'http://dxlab.sl.nsw.gov.au/loom',
    caption: 'Loom Index view',
  },
  experiments: {
    imageUrl: '/static/images/masthead-meridian-f.jpg',
    url: 'http://dxlab.sl.nsw.gov.au/meridian',
    caption: 'Meridian: Miranda Globe',
  },
  grants: {
    imageUrl: '/static/images/masthead-bookman.jpg',
    caption: 'Book projection',
  },
  code: {
    imageUrl: '/static/images/masthead-portico.jpg',
    url: 'http://dxlab.sl.nsw.gov.au/portico',
    caption: 'Portico',
  },
};
