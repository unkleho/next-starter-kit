import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { stylesheet, classNames } from './page.css';
import App from '../../components/App';
import Header from '../../components/Header';

export default class Page extends Component {

  static propTypes = {
    id: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
    };
  }

  static getInitialProps ({ query: { id = null }, store }) {
    // await store.dispatch();

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
