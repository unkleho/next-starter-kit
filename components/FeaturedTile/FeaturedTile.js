import { Component } from 'react';
import PropTypes from 'prop-types';

import TileImage from '../TileImage';
// import Link from '../Link';
import styles from './FeaturedTile.css';

class FeaturedTile extends Component {

  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const {
      title,
      url,
      imageUrl,
      content,
    } = this.props;

    return (
      <article className="featured-tile">

        <TileImage
          url={url}
          imageUrl={imageUrl}
          className="featured-tile__image"
        />

        <div className="featured-tile__info">
          <h1>{title}</h1>
          <div className="featured-tile__content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>

        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default FeaturedTile;
