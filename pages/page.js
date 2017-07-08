import { Component } from 'react';
import PropTypes from 'prop-types';

import App from '../components/App';
import Header from '../components/Header';

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
        <Header />
        Page
      </App>
    )
  }

}
