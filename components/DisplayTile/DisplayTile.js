import { Component } from 'react';
import PropTypes from 'prop-types';

import TileImage from '../TileImage';
// import Link from '../Link';
import Button from '../Button';
import styles from './DisplayTile.css';

class DisplayTile extends Component {

  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    size: PropTypes.oneOf([
      '2x1',
      '1x2',
    ]),
  }

  render() {
    const {
      title,
      url,
      imageUrl,
      content,
      size,
    } = this.props;

    return (
      <article className={`display-tile ${size && `display-tile--${size}`}`}>

        <TileImage
          url={url}
          imageUrl={imageUrl}
          className="display-tile__image"
        />

        <div className="display-tile__info">
          <div className="display-tile__body">
            <h1 className="display-tile__title">{title}</h1>

            <div className="display-tile__content" dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>

          <div className="display-tile__cta">
            <Button>LAUNCH</Button>
          </div>
        </div>

        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default DisplayTile;
