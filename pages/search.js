import { Component } from 'react';

import App from '../components/App';
import SearchModal from '../components/SearchModal';
import withData from '../lib/withData';

class SearchPage extends Component {
  render() {
    const { url, posts, loading: isLoading } = this.props;

    // console.log(url);

    return (
      <App pathname={url.pathname} isLoading={isLoading} title="Search">
        <div className="search-page container container--md">
          <SearchModal posts={posts} q={url.query.q} isLoading />
        </div>
      </App>
    );
  }
}

export default withData(SearchPage);
