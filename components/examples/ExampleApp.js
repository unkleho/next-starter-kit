import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import baseStyles from '../../styles/base.css';
import helpersStyles from '../../styles/helpers.css';
import { initGA, logPageView, logEvent } from '../../lib/analytics';

class ExampleApp extends Component {

  static propTypes = {
    url: PropTypes.object,
  }

  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
    logEvent('category', 'action', 'label');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url.query !== this.props.url.query) {
      logEvent('category', 'action', 'label');
    }
  }

  render() {
    return (
      <div className="example-app">
        <Head>
          <title>Example App</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        {this.props.children}

        <style jsx global>{helpersStyles}</style>
        <style jsx global>{baseStyles}</style>
      </div>
    );
  }
}

export default ExampleApp;
