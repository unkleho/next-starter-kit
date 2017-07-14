import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';

// import { stylesheet, classNames } from './page.css';
import styles from './page.css';
import withData, { createApolloReduxStore } from '../lib/withData';
import App from '../components/App';
import Header from '../components/Header';
import { exampleAction } from '../actions/exampleActions';

class Page extends Component {

  static propTypes = {
    id: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
    };
  }

  static getInitialProps ({ query: { id = null }, serverState }) {
    const store = createApolloReduxStore(serverState);
    store.dispatch(exampleAction('payload'));

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
        {/* <Head><style dangerouslySetInnerHTML={{__html: stylesheet}} /></Head> */}

        <Header />

        <h1 className="title">Page <span>{id}</span></h1>

        <h2>Lost Grid Test</h2>
        <div>
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </div>

        <style jsx>{styles}</style>
      </App>
    )
  }

}

export default withData(Page);
