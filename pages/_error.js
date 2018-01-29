import { Component } from 'react';

import App from '../components/App';
import Masthead from '../components/Masthead';

class Four04 extends Component {
  render() {
    return (
      <App>
        <div className="posts container container--lg">
          <Masthead
            title="page not found"
            backgroundImageUrl="/static/images/masthead-search-terms-projection.jpg"
            slug="page not found"
          />
        </div>
      </App>
    );
  }
}

export default Four04;
