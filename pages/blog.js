import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import styles from './index.css';

const HomePage = ({
  url,
  posts,
  loading: isLoading,
}) => (
  <App pathname={url.pathname} isLoading={isLoading}>

    <Masthead
      // subtitle="Welcome to the DX Lab:"
      title={(
        <div>
          BLOG<br/>
          <a href="https://twitter.com">#dxlab</a>
        </div>
      )}
      // text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
      backgroundImageUrl="/static/images/masthead-portico.jpg"
      slug="BLOG"
      size="md"
    />

    <div className="posts container container--lg">
      <SectionTitle title="Posts"></SectionTitle>

      <div>
        {posts && posts.map((post, i) => (
          <SimpleTile
            subtitle="17.10.2017"
            title={post.title}
            url={post.url}
            slug={post.slug}
            imageUrl={post.imageUrl}
            imageAltText={post.imageAltText}
            content={post.content}
            key={`tile-${i}`}
          />
        ))}
      </div>
    </div>

    <style global jsx>{styles}</style>
  </App>
);

const query = gql`
  query {
    posts(limit: 10) {
      title
      slug
      excerpt
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

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(query, {
  props: ({ data }) => {
    return {
      ...data,
      posts: data && data.posts && data.posts.map((post) => {
        return {
          title: post.title,
          content: post.excerpt,
          slug: post.slug,
          imageUrl: post.featuredMedia.sizes.full.sourceUrl,
          imageAltText: post.featuredMedia.sizes.full.altText,
        };
      }),
    };
  },
})(HomePage));
