import { Component } from 'react';

import Link from '../Link';
import styles from './TileImage.css';

class TileImage extends Component {
  handleMouseOver = () => {
    if (typeof this.props.onMouseOver === 'function') {
      this.props.onMouseOver();
    }
  };

  handleMouseOut = () => {
    if (typeof this.props.onMouseOut === 'function') {
      this.props.onMouseOut();
    }
  };

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
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
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
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <style jsx>{styles}</style>
        </a>
      </Link>
    );
  }
}

export default TileImage;
