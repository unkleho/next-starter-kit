import { Component } from 'react';

import App from '../components/App';
import initMaze from '../lib/dxmaze';

class Four04 extends Component {
  componentDidMount() {
    initMaze();
  }

  render() {
    return (
      <App>
        <div className="container container--lg" id="dxmaze-holder">
          <canvas id="dxmaze" />
        </div>
        <h1 className="error__title">
          some experiments fail.<br />page not found!
        </h1>
        <style jsx>{`
          #dxmaze {
            margin-top: 2em;
          }
          .error__title {
            text-align: center;
            padding-top: 1em;
          }
        `}</style>
      </App>
    );
  }
}

export default Four04;
