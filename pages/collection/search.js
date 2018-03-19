import { gql, graphql } from 'react-apollo';

import withData from '../../lib/withData';
import App from '../../components/App';
import Link from '../../components/Link';
import styles from './search.css';

const SearchPage = ({ url, items, facets, loading: isLoading }) => (
  <App
    pathname="/search"
    isLoading={isLoading}
    title="Search"
    metaDescription="{excerpt}"
  >
    <div className="search-page container container--lg">
      <br />
      <h2>Search Collection</h2>

      <form method="get" action="/collection/search" className="search-form">
        <input
          type="text"
          name="q"
          defaultValue={url.query.q}
          className="search-form__input"
        />
        <input type="submit" className="button" />
      </form>

      <div className="search-page__results">
        <div className="search-page__facet-list">
          {facets &&
            facets.map((facet) => (
              <div className="search-page__facet">
                <h3 className="search-page__facet__title">{facet.name}</h3>
                <div className="search-page__facet__values">
                  {facet.values.map((value) => (
                    <div className="search-page__facet__value-name">
                      {value.name} ({value.count})
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className="search-page__items">
          {items &&
            items.map(
              ({ id, sourceRecordId, title, images, type, description }, i) => (
                <article className="item" key={`posts-${i}`}>
                  <Link to={`/collection/item/${id}`}>
                    {/* <Link
		                to={`http://archival.sl.nsw.gov.au/Details/archive/${sourceRecordId}`}
		              > */}
                    <a>
                      <div className="item__image-holder">
                        {images && images[0] && images[0].url ? (
                          <img src={images[0].url} alt={title} />
                        ) : (
                          <div>No Image</div>
                        )}
                      </div>

                      <div className="item__info">
                        <div className="item__type">{type}</div>
                        <h2>{title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: description }} />
                        <p className="item__id">{id}</p>
                      </div>
                    </a>
                  </Link>
                </article>
              ),
            )}
        </div>
      </div>
    </div>

    <style jsx>{styles}</style>
  </App>
);

const query = gql`
  query Search($q: String, $facets: [PrimoFacetType]) {
    primoSearch(search: $q, facets: $facets) {
      records {
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
      facets {
        name
        values {
          name
          count
        }
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(
  graphql(query, {
    options: ({ url: { query: { q, facets } } }) => {
      return {
        variables: {
          q,
          facets: buildFacetQuery(facets),
        },
      };
    },
    props: ({ data, ownProps }) => {
      if (ownProps.url.query.q && data.primoSearch) {
        return {
          ...data,
          items: data.primoSearch.records,
          facets: data.primoSearch.facets,
        };
      }

      return null;
    },
  })(SearchPage),
);

const buildFacetQuery = (facetUrlArgs) => {
  if (facetUrlArgs && facetUrlArgs.length > 0) {
    return facetUrlArgs.map((facetUrlArg) => {
      const facet = facetUrlArg.split(',');

      return {
        name: facet[0],
        value: facet[1],
      };
    });
  }

  return null;
};
