import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ShareBox.css';

class ShareBox extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  render() {
    const fbAppId = process.env.FB_APP_ID;
    // TODO: Use baseUrl variable
    const url = encodeURIComponent(
      `https://dxlab.sl.nsw.gov.au/${this.props.pathname}`,
    );
    const fbLink = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&display=popup&href=${url}&redirect_uri=${url}`;
    const twitterLink = `https://twitter.com/intent/tweet?url=${url}`;

    return (
      <div className="share-box">
        <div className="share-box__title">Share</div>

        <div className="share-box__icons">
          <a href={fbLink} aria-label="Share this post on Facebook">
            <span
              className="share-box__icon slnsw-icon-facebook"
              aria-hidden="true"
            />
          </a>

          <a href={twitterLink} aria-label="Share this post on Twitter">
            <span
              className="share-box__icon slnsw-icon-twitter"
              aria-hidden="true"
            />
          </a>
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ShareBox;
