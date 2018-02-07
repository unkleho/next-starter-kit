import { Component } from 'react';

import Page from './page';
import shuffle from '../lib/shuffle';

class AboutPage extends Component {
  componentDidMount() {
    shuffle();
  }

  render() {
    return <Page {...this.props} />;
  }
}

export default AboutPage;
