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
        <div className="container container--lg" id="dxmaze-holder">
          <canvas id="dxmaze" />
        </div>
        <style jsx>{`
          #dxmaze {
            border: 2px solid yellow;
          }
        `}</style>
      </App>
    );
  }
}

export default Four04;
