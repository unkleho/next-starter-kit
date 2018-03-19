import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { PhotoSwipeGallery } from 'react-photoswipe';
import Head from 'next/head';
// import sizeOf from 'image-size';

import withData from '../../lib/withData';
import App from '../../components/App';
import styles from './item.css';

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
      item.images &&
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
            <button
              className="collection-item__back-button"
              onClick={() => window.history.back()}
            >
              &#9664; Back to search
            </button>
            <div className="collection-item__gallery">
              {images &&
                images.length > 0 && (
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
            </div>

            <h1 className="collection-item__title">{item.title}</h1>
            <p className="collection-item__type">Type: {item.type}</p>
            <p className="collection-item__id">Id: {item.id}</p>

            <p dangerouslySetInnerHTML={{ __html: item.description }} />

            <h2>Subjects</h2>
            <ul>
              {item.subjects &&
                item.subjects.map((subject) => <li>{subject}</li>)}
            </ul>
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
      images(size: FULL) {
        url
        width
        height
      }
      subjects
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
