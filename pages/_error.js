import { Component } from 'react';

import App from '../components/App';
import init from '../lib/dxmaze';

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
        <h1>Some experiments fail.</h1>
        <h2>Page not found!</h2>
        <style jsx>{`
          #dxmaze {
            margin-top: 0;
          }
          h1,
          h2 {
            text-align: center;
            padding-top: 0;
          }
          h2 {
            margin-top: 0;
          }
        `}</style>
      </App>
    );
  }
}

export default Four04;
