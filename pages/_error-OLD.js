import { Component } from 'react';

import App from '../components/App';
import Masthead from '../components/Masthead';
import init from '../lib/dxmaze.js';

class Four04 extends Component {
  componentDidMount() {
    init();
  }

  render() {
    return (
      <App>
        <div className="posts container container--lg">
          <Masthead
            title="page not found"
            backgroundImageUrl="/static/images/masthead-search-terms-projection.jpg"
            slug="page not found"
          />
          <canvas id="dxmaze" />
        </div>
      </App>
    );
  }
}

export default Four04;
