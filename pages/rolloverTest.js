import { Component } from 'react';

import App from '../components/App';
import rolloverShuffle from '../lib/rolloverShuffle.js';

class Four04 extends Component {
  // componentDidMount() {
  // init();
  // }

  componentDidMount() {
    rolloverShuffle();
  }

  render() {
    return (
      <App>
        <div className="masthead__content container container--lg">
          <h1 className="masthead__title">
            <span className="masthead__title__small">this is a test page</span>
            <br />
            <span className="masthead__title__main">yes really it is</span>
            <br />
            <span className="masthead__title__highlight">Experiments</span>
          </h1>
          <p className="masthead__intro-list" />
        </div>
      </App>
    );
  }
}

export default Four04;
