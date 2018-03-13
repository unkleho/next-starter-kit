import { gql, graphql } from 'react-apollo';
import { PhotoSwipeGallery } from 'react-photoswipe';
import Head from 'next/head';

import withData from '../../lib/withData';
import App from '../../components/App';
// import Link from '../../components/Link';
import styles from './search.css';

const CollectionItemPage = ({ item, loading: isLoading }) => {
  const images =
    item &&
    item.images.map((image) => {
      return {
        src: image.url,
        thumbnail: image.url,
        w: 2000,
        h: 3000,
      };
    });

  return (
    <App pathname="/search" isLoading={isLoading} title="Collection Item">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/styles/photoswipe.css"
        />
      </Head>

      {item && (
        <div className="collection-item container container--md">
          {item.images && (
            <PhotoSwipeGallery
              items={images}
              thumbnailContent={(image) => {
                return (
                  <img
                    src={image.src}
                    className="collection-item__image"
                    // style={style}
                    alt="This should be something meaningful"
                  />
                );
              }}
            />
          )}

          <p>{item.type}</p>
          <h1>{item.title}</h1>

          <p>{item.description}</p>
        </div>
      )}

      <style jsx>{styles}</style>
      <style jsx global>
        {`
          .pswp-thumbnails {
            display: flex;
            flex-wrap: wrap;
          }

          .pswp-thumbnail {
            width: 10%;
            margin-right: 3px;
          }

          .pswp-thumbnail:first-child {
            width: 100%;
          }

          .pswp-thumbnail img {
            width: 100%;
          }
        `}
      </style>
    </App>
  );
};

const query = gql`
  query Search($id: String) {
    primoRecord(id: $id) {
      id
      sourceId
      sourceRecordId
      title
      type
      description
      images {
        url
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(
  graphql(query, {
    options: ({ url: { query: { item } } }) => {
      return {
        variables: {
          id: item,
        },
      };
    },
    props: ({ data }) => {
      // console.log(data.primoRecord);
      return {
        ...data,
        item: data.primoRecord,
      };
    },
  })(CollectionItemPage),
);
