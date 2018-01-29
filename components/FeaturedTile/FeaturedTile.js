import { Component } from 'react';
import PropTypes from 'prop-types';

import TileImage from '../TileImage';
// import Link from '../Link';
import Button from '../Button';
import styles from './FeaturedTile.css';

class FeaturedTile extends Component {
  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    size: PropTypes.oneOf(['2x1', '1x2']),
  };

  render() {
    const { title, url, imageUrl, content, size } = this.props;

    return (
      <article className={`featured-tile ${size && `featured-tile--${size}`}`}>
        <TileImage
          url={url}
          imageUrl={imageUrl}
          className="featured-tile__image"
        />

        <div className="featured-tile__info">
          <h1>{title}</h1>
          <div
            className="featured-tile__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="featured-tile__cta">
            <Button>Read</Button>
          </div>
        </div>

        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
      </article>
    );
  }
}

export default FeaturedTile;
