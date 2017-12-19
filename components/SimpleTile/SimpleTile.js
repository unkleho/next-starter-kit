import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import Image from '../Image';
// import TileImage from '../TileImage';
// import Button from '../Button';
import styles from './SimpleTile.css';

class SimpleTile extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
  }

  render() {
    const {
      title,
      subtitle,
      url,
      imageUrl,
      imageAltText,
    } = this.props;

    return (
      <article className="simple-tile simple-tile--tall">

        {/* <TileImage
          imageUrl={imageUrl}
          url={url}
          className="simple-tile__image"
        /> */}

        <Link to={url}>
          <a className="simple-tile__image">
            <Image
              src={imageUrl}
              alt={imageAltText}
            />
          </a>
        </Link>

        <div className="simple-tile__info">
          <p className="simple-tile__subtitle">{subtitle}</p>
          <h2 className="simple-tile__title">
            <Link to={url}>
              <a dangerouslySetInnerHTML={{ __html: title }}></a>
            </Link>
          </h2>
        </div>

        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default SimpleTile;
