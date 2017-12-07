import { Component } from 'react';

import App from '../components/App';
import SearchModal from '../components/SearchModal';
import withData from '../lib/withData';

class SearchPage extends Component {

  render() {

    return (
      <App>
        <SearchModal posts={this.props.posts} />
      </App>
    );
  }

}

export default withData(SearchPage);
