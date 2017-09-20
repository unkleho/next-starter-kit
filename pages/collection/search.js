import { gql, graphql } from 'react-apollo';

import withData from '../../lib/withData';
import ExampleApp from '../../components/examples/ExampleApp';
import Link from '../../components/Link';
import Header from '../../components/Header';
import styles from './index.css';

const SearchPage = ({
  url,
  items,
}) => (
  <ExampleApp>
    <Header pathname={url.pathname} />

    {console.log(items)}

    <form method="get" action="/collection/search">
      <input type="text" name="q" defaultValue={url.query.q} />
      <input type="submit" />
    </form>

    <div className="posts">
      {items && items.map(({ id, sourceRecordId, title, images }, i) => (
        <article key={`posts-${i}`}>
          <Link to={`http://archival.sl.nsw.gov.au/Details/archive/${sourceRecordId}`}>
            <a>
              <img src={images && images[0].url} alt={title} />
              <h2>{title}</h2>
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
  props: ({ data }) => {
    return {
      ...data,
      items: data.primoSearch,
    };
  },
})(SearchPage));
