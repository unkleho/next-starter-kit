import { Component } from 'react';

import styles from './ShareBox.css';

class ShareBox extends Component {

  render() {
    return (
      <div className="share-box">

        <div className="share-box__title">Share</div>

        <div className="share-box__icons">
          <a href="" aria-label="Share this post on Facebook">
            <span className="share-box__icon slnsw-icon-facebook" aria-hidden="true"></span>
          </a>

          <a href="" aria-label="Share this post on Twitter">
            <span className="share-box__icon slnsw-icon-twitter" aria-hidden="true"></span>
          </a>
        </div>

        <style jsx>{styles}</style>

      </div>
    );
  }

}

export default ShareBox;
