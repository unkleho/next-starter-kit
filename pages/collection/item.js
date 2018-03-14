import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { PhotoSwipeGallery } from 'react-photoswipe';
import Head from 'next/head';
// import sizeOf from 'image-size';

import withData from '../../lib/withData';
import App from '../../components/App';
import styles from './search.css';

class CollectionItemPage extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  render() {
    const { isLoading, item } = this.props;

    const images =
      item &&
      item.images.length > 0 &&
      item.images.map((image) => {
        return {
          src: image.url,
          w: image.width,
          h: image.height,
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
            {images.length > 0 && (
              <PhotoSwipeGallery
                items={images}
                thumbnailContent={(image) => {
                  return (
                    <img
                      src={image.src}
                      className="collection-item__image"
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
  }
}

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
        width
        height
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
