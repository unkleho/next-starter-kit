import { gql, graphql } from 'react-apollo';

import withData from '../../lib/withData';
import App from '../../components/App';
// import Link from '../../components/Link';
import styles from './search.css';

const CollectionItemPage = ({ item, loading: isLoading }) => (
  <App pathname="/search" isLoading={isLoading} title="Collection Item">
    {item && (
      <div className="collection-item container container--md">
        {item.images.map((image) => {
          return (
            <img
              src={image.url}
              className="collection-item__image"
              style={{
                width: '100%',
              }}
            />
          );
        })}

        <h1>{item.title}</h1>

        <p>{item.description}</p>
      </div>
    )}

    <style jsx>{styles}</style>
  </App>
);

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
      console.log(data.primoRecord);
      return {
        ...data,
        item: data.primoRecord,
      };
    },
  })(CollectionItemPage),
);
