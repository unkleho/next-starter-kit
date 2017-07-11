import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import { stylesheet, classNames } from './page.css';
import withData from '../lib/withData';
import initRedux from '../lib/initRedux';
import initApollo from '../lib/initApollo';
import App from '../components/App';
import Header from '../components/Header';
import { exampleAction } from '../actions';

class Page extends Component {

  static propTypes = {
    id: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
    };
  }

  static getInitialProps ({ query: { id = null }, serverState, req }) {
    const isServer = !!req;
    const apollo = initApollo();
    const store = initRedux(apollo, serverState);

    store.dispatch(exampleAction('payloadsss'));

    return {
      id,
    }
  }

  render() {
    const {
      id,
    } = this.props;

    return(
      <App>
        <Head><style dangerouslySetInnerHTML={{__html: stylesheet}} /></Head>

        <Header />

        <h1 className={classNames.title}>Page <span>blue</span></h1>

        <div>
          <div className={classNames.box}>1</div>
          <div className={classNames.box}>2</div>
          <div className={classNames.box}>3</div>
        </div>
      </App>
    )
  }

}

export default withData(Page);
