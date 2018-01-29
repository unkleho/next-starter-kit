import { Component } from 'react';
import Head from 'next/head';

import { buildHeadTitle } from '../../lib';

class HeadMeta extends Component {
  render() {
    const { title } = this.props;

    return (
      <Head>
        <title>{buildHeadTitle(title)}</title>
      </Head>
    );
  }
}

export default HeadMeta;
