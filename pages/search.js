import { Component } from 'react';

import App from '../components/App';
import SearchModal from '../components/SearchModal';
import withData from '../lib/withData';
import config from '../lib/config';

class SearchPage extends Component {
  render() {
    const { url, posts, loading: isLoading } = this.props;

    return (
      <App
        pathname={url.pathname}
        isLoading={isLoading}
        title="Search"
        metaImageUrl={`${
          config.baseUrl
        }/static/images/masthead-search-terms-projection.jpg`}
      >
        <div className="search-page container container--md">
          <SearchModal posts={posts} q={url.query.q} isLoading />
        </div>
      </App>
    );
  }
}

export default withData(SearchPage);
