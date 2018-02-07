import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ShareBox.css';

class ShareBox extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  };

  render() {
    const { title, text, pathname, imageUrl } = this.props;
    const tweetText = encodeURIComponent(`${text} #dxlab @statelibrarynsw`);
    const fbAppId = process.env.FB_APP_ID;

    // TODO: Use baseUrl variable
    const url = encodeURIComponent(`http://dxlab.sl.nsw.gov.au${pathname}`);
    const fbLink = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&href=${url}&redirect_uri=${url}&name=%${encodeURIComponent(
      title,
    )}&description=${encodeURIComponent(text)}${
      imageUrl ? `&picture=${imageUrl}` : ''
    }`;

    const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;

    return (
      <div className="share-box">
        <div className="share-box__title">Share</div>

        <div className="share-box__icons">
          <a
            href={fbLink}
            aria-label="Share this post on Facebook"
            target="_blank"
          >
            <span
              className="share-box__icon slnsw-icon-facebook"
              aria-hidden="true"
            />
          </a>

          <a
            href={twitterLink}
            aria-label="Share this post on Twitter"
            target="_blank"
          >
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
