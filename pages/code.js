import { Component } from 'react';

import Page from './page';

class CodePage extends Component {
  render() {
    return <Page {...this.props} />;
  }
}

export default CodePage;
