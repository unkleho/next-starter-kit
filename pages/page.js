import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { stylesheet, classNames } from './page.css';
import withData from '../lib/withData';
import initRedux from '../lib/initRedux';
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

  static getInitialProps ({ query }) {
    // await store.dispatch();
    // store.dispatch(exampleAction('payload'));
    console.log(query);

    // return {
    //   id,
    // }
  }

  render() {
    const {
      id,
      // exampleAction
    } = this.props;

    console.log(this.props.test);
    // exampleAction('test');

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

// const mapStateToProps = state => {
//   return {
//     test: state,
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     exampleAction: payload => {
//       dispatch(exampleAction(payload))
//     }
//   }
// }
//
// export default withData(connect(mapStateToProps, mapDispatchToProps)(Page));
export default withData(Page);
