import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import queryString from 'query-string';

import withData from '../../lib/withData';
import App from '../../components/App';
import Link from '../../components/Link';
import styles from './search.css';

class SearchPage extends Component {
  constructor() {
    super();

    this.state = {
      facetsShowAll: [],
      initialFacetValueCount: 5,
    };
  }

  handleFacetToggle = (facetName) => {
    this.setState({
      facetsShowAll: addOrRemove(this.state.facetsShowAll, facetName),
    });
  };

  render() {
    const { url, items, facets, loading: isLoading } = this.props;
    const selectedFacets = wrapArray(url.query.facets).map((f) =>
      convertStringToFacet(f),
    );
    const { facetsShowAll, initialFacetValueCount } = this.state;

    return (
      <App
        pathname="/search"
        isLoading={isLoading}
        title="Search"
        metaDescription="{excerpt}"
      >
        <div className="search-page container container--lg">
          <br />
          <h2>Search Collection</h2>

          <form
            method="get"
            action="/collection/search"
            className="search-form"
          >
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
                facets.map((facet) => {
                  // Check if facet.name is in facetsShowAll, if so, show all facet values.
                  const showAll = facetsShowAll.indexOf(facet.name) > -1;
                  const facetValues = showAll
                    ? facet.values
                    : facet.values.slice(0, initialFacetValueCount);

                  return (
                    <div
                      className="search-page__facet"
                      key={`search-page__facet-${facet.name}`}
                    >
                      <h3 className="search-page__facet__title">
                        {facet.name}
                      </h3>

                      <div className="search-page__facet__values">
                        {facetValues.map((value) => {
                          // Change to array if string
                          const facetParams =
                            typeof url.query.facets === 'string'
                              ? [url.query.facets]
                              : url.query.facets;

                          const urlObject = {
                            ...url.query,
                            facets: [
                              ...(facetParams || []),
                              `${facet.name},${encodeURIComponent(value.name)}`,
                            ],
                          };
                          const urlString = queryString.stringify(urlObject, {
                            encode: false,
                          });

                          return (
                            <div
                              className="search-page__facet__value-name"
                              key={`search-page__facet__value-name-${
                                value.name
                              }`}
                            >
                              <Link to={`${url.pathname}?${urlString}`}>
                                <a>
                                  {value.name} ({value.count})
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                      </div>

                      {facet.values.length >= initialFacetValueCount && (
                        <button
                          className="search-page__facet__toggle"
                          onClick={() => this.handleFacetToggle(facet.name)}
                        >
                          {showAll ? 'less' : 'more'}
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="search-page__items">
              {selectedFacets.length > 0 && (
                <div className="search-page__selected-facets">
                  {selectedFacets.map((selectedFacet) => {
                    const urlObject = {
                      ...url.query,

                      // Filter out current facet
                      facets: wrapArray(url.query.facets).filter(
                        (facetString) => {
                          return (
                            facetString !==
                            `${selectedFacet.name},${selectedFacet.value}`
                          );
                        },
                      ),
                    };

                    const urlString = queryString.stringify(urlObject, {
                      encode: false,
                    });

                    return (
                      <Link
                        to={`${url.pathname}?${urlString}`}
                        key={`search-page__facet-button-${selectedFacet.value}`}
                      >
                        <a className="search-page__facet-button">
                          {selectedFacet.name}: {selectedFacet.value} (x)
                        </a>
                      </Link>
                    );
                  })}
                </div>
              )}

              {items &&
                items.map(
                  (
                    { id, sourceRecordId, title, images, type, description },
                    i,
                  ) => (
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
                            <p
                              dangerouslySetInnerHTML={{ __html: description }}
                            />
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
  }
}

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
  const args = wrapArray(facetUrlArgs);

  if (args && args.length > 0) {
    return args.map((arg) => convertStringToFacet(arg));
  }

  return null;
};

const wrapArray = (stringOrArray = []) => {
  return typeof stringOrArray === 'string' ? [stringOrArray] : stringOrArray;
};

const convertStringToFacet = (string) => {
  const facet = string.match(/([^,]*),(.*)/);

  return {
    name: facet[1],
    value: facet[2],
  };

  // Sorry for the regex madness:
  // https://stackoverflow.com/questions/6131195/splitting-string-from-the-first-occurrence-of-a-character/6131257
};

const addOrRemove = (array, value) => {
  const index = array.indexOf(value);

  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }

  return array;
};
