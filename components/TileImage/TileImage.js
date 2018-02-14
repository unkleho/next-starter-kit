import { Component } from 'react';

import Link from '../Link';
import styles from './TileImage.css';

class TileImage extends Component {
  render() {
    const {
      url,
      target,
      imageUrl,
      className = '',
      ariaLabel = '',
    } = this.props;

    // TODO: Make this DRY!
    return url && url.match('^http') ? (
      <a
        href={url}
        className={`tile-image ${className}`}
        target={target}
        aria-label={ariaLabel}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <style jsx>{styles}</style>
      </a>
    ) : (
      <Link to={url}>
        <a
          className={`tile-image ${className}`}
          target={target}
          aria-label={ariaLabel}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <style jsx>{styles}</style>
        </a>
      </Link>
    );
  }
}

export default TileImage;
