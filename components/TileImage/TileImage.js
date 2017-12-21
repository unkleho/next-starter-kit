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
    } = this.props;

    return (
      <Link to={url}>
        <a
          className={`tile-image ${className}`}
          target={target}
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
