import { gql, graphql } from 'react-apollo';

import withData from '../../lib/withData';
import ExampleApp from '../../components/examples/ExampleApp';
import Link from '../../components/Link';
import Header from '../../components/Header';
import styles from './search.css';

const SearchPage = ({
  url,
  items,
}) => (
  <ExampleApp>
    <Header pathname={url.pathname} />

    <div className="search-page">
      <div className="search-form">
        <form method="get" action="/collection/search">
          <input type="text" name="q" defaultValue={url.query.q} />
          <input type="submit" />
        </form>
      </div>

      {items && items.map(({ id, sourceRecordId, title, images, type, description }, i) => (
        <article key={`posts-${i}`}>
          <Link to={`http://archival.sl.nsw.gov.au/Details/archive/${sourceRecordId}`}>
            <a>
              <div className="item__image-holder">
                {images && images[0].url ? (
                  <img src={images[0].url} alt={title} />
                ) : (
                  <div>No Image</div>
                )}
              </div>

              <div className="item__info">
                <div className="item__type">{type}</div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </a>
          </Link>
        </article>
      ))}
    </div>

    <style jsx>{styles}</style>
  </ExampleApp>
);

const homeQuery = gql`
  query Search($q: String) {
    primoSearch(q: $q) {
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
export default withData(graphql(homeQuery, {
  options: ({ url: { query: { q } } }) => {
    return {
      variables: {
        q,
      },
    };
  },
  props: ({ data, ownProps }) => {
    return {
      ...data,
      items: ownProps.url.query.q && data.primoSearch,
    };
  },
})(SearchPage));
