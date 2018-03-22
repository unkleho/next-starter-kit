import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';

import withData from '../../lib/withData';
import App from '../../components/App';
import Link from '../../components/Link';
import styles from './search.css';

class CollectionSearchPage extends Component {
  constructor() {
    super();

    this.state = {
      showMobileFacetList: false,
      showDesktopFacetList: true,
      facetsShowAll: [],
      initialFacetValueCount: 5,
    };
  }

  handleDesktopFacetListToggle = () => {
    this.setState({
      showDesktopFacetList: !this.state.showDesktopFacetList,
    });
  };

  handleMobileFacetListToggle = () => {
    this.setState({
      showMobileFacetList: !this.state.showMobileFacetList,
    });
  };

  handleFacetToggle = (facetName) => {
    this.setState({
      facetsShowAll: addOrRemove(this.state.facetsShowAll, facetName),
    });
  };

  render() {
    const {
      url,
      items,
      facets,
      loading: isLoading,
      totalItems,
      loadMore,
    } = this.props;
    const selectedFacets = wrapArray(url.query.facets).map((f) =>
      convertStringToFacet(f),
    );
    const {
      facetsShowAll,
      initialFacetValueCount,
      showMobileFacetList,
      showDesktopFacetList,
    } = this.state;

    console.log(showMobileFacetList);

    return (
      <App
        pathname="/search"
        // isLoading={isLoading}
        title="Search"
        metaDescription="{excerpt}"
      >
        <div className="collection-search-page container container--lg">
          <h1 className="collection-search-page__title">Search Collection</h1>

          <form
            method="get"
            action="/collection/search"
            className="collection-search-page__form"
          >
            <input
              type="text"
              name="q"
              placeholder="Start searching"
              defaultValue={url.query.q}
              className="collection-search-page__form__input"
            />
            <input type="submit" className="button" />
          </form>

          <div className="collection-search-page__info">
            <button
              className="collection-search-page__toggle-facet-list-button collection-search-page__toggle-facet-list-button--mobile"
              onClick={this.handleMobileFacetListToggle}
            >
              {showMobileFacetList ? '< Hide' : '> Show'} Facets
            </button>

            <button
              className="collection-search-page__toggle-facet-list-button collection-search-page__toggle-facet-list-button--desktop"
              onClick={this.handleDesktopFacetListToggle}
            >
              {showDesktopFacetList ? '< Hide' : '> Show'} Facets
            </button>

            <div className="collection-search-page__total-items">
              {numberWithCommas(totalItems)} results
            </div>
          </div>

          <div className="collection-search-page__results">
            <div
              className={`collection-search-page__facet-list ${
                showDesktopFacetList
                  ? 'collection-search-page__facet-list--is-desktop-active'
                  : ''
              } ${
                showMobileFacetList
                  ? 'collection-search-page__facet-list--is-mobile-active'
                  : ''
              }`}
            >
              <button
                className="collection-search-page__facet-list__mobile-button"
                onClick={this.handleMobileFacetListToggle}
              >
                {showMobileFacetList ? '< Hide' : '> Show'} Facets
              </button>

              {facets &&
                facets.map((facet) => {
                  // Check if facet.name is in facetsShowAll, if so, show all facet values.
                  const showAll = facetsShowAll.indexOf(facet.name) > -1;
                  const facetValues = showAll
                    ? facet.values
                    : facet.values.slice(0, initialFacetValueCount);

                  return (
                    <div
                      className="collection-search-page__facet"
                      key={`collection-search-page__facet-${facet.name}`}
                    >
                      <h3 className="collection-search-page__facet__title">
                        {facet.name}
                      </h3>

                      <div className="collection-search-page__facet__values">
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
                              `${facet.slug},${encodeURIComponent(value.slug)}`,
                            ],
                          };
                          const urlString = queryString.stringify(urlObject, {
                            encode: false,
                          });

                          return (
                            <div
                              className="collection-search-page__facet__value-name"
                              key={`collection-search-page__facet__value-name-${
                                value.name
                              }`}
                            >
                              <Link to={`${url.pathname}?${urlString}`}>
                                <a>
                                  {value.name}{' '}
                                  <span className="collection-search-page__facet__value-count">
                                    <span>
                                      ({numberWithCommas(value.count)})
                                    </span>
                                  </span>
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                      </div>

                      {facet.values.length >= initialFacetValueCount && (
                        <button
                          className="collection-search-page__facet__toggle"
                          onClick={() => this.handleFacetToggle(facet.name)}
                        >
                          {showAll ? 'less' : 'more'}
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="collection-search-page__items">
              {selectedFacets.length > 0 && (
                <div className="collection-search-page__selected-facets">
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
                        key={`collection-search-page__facet-button-${
                          selectedFacet.value
                        }`}
                      >
                        <a className="collection-search-page__facet-button">
                          {selectedFacet.name}: {selectedFacet.value} (x)
                        </a>
                      </Link>
                    );
                  })}
                </div>
              )}

              {isLoading && (
                <div className="collection-search-page__results__loader" />
              )}

              <div
                className={`collection-search-page__results__items ${
                  isLoading
                    ? 'collection-search-page__results__items--is-loading'
                    : ''
                }`}
              >
                {items && (
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={items.length < 100}
                    loader={
                      <div className="collection-search-page__results__loader">
                        <div className="collection-search-page__results__loader__text">
                          Loading <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </div>
                      </div>
                    }
                  >
                    {items.map(
                      (
                        {
                          id,
                          sourceRecordId,
                          title,
                          images,
                          type,
                          description,
                        },
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
                                  dangerouslySetInnerHTML={{
                                    __html: description,
                                  }}
                                />
                                <p className="item__id">{id}</p>
                              </div>
                            </a>
                          </Link>
                        </article>
                      ),
                    )}
                  </InfiniteScroll>
                )}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{styles}</style>
      </App>
    );
  }
}

const query = gql`
  query Search($q: String, $facets: [PrimoFacetType], $offset: Int) {
    primoSearch(search: $q, facets: $facets, offset: $offset) {
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
        slug
        values {
          name
          slug
          count
        }
      }
      info {
        total
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
          offset: 0,
        },
      };
    },
    props: ({ data, ownProps }) => {
      if (ownProps.url.query.q && data.primoSearch) {
        return {
          ...data,
          items: data.primoSearch.records,
          facets: data.primoSearch.facets,
          totalItems: data.primoSearch.info.total,
          loadMore() {
            return data.fetchMore({
              variables: {
                offset: data.primoSearch.records.length,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult;
                }

                return {
                  ...previousResult,
                  primoSearch: {
                    records: [
                      ...previousResult.primoSearch.records,
                      ...fetchMoreResult.primoSearch.records,
                    ],
                  },
                };
              },
            });
          },
        };
      }

      return null;
    },
  })(CollectionSearchPage),
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

const numberWithCommas = (x) => {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
