import { Component } from 'react';
import PropTypes from 'prop-types';

// import Link from '../Link';
import TileImage from '../TileImage';
import Button from '../Button';
import styles from './Tile.css';

class Tile extends Component {

  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const {
      title,
      url,
      imageUrl,
      content,
      // imageAltText,
    } = this.props;

    return (
      <article className="tile tile--tall">

        <TileImage
          imageUrl={imageUrl}
          url={url}
          className="tile__image"
        />

        {/* <Link to={`${url}`}>
          <a>
            <div
              className="tile__image"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}></div>
          </a>
        </Link> */}

        <div className="tile__info">
          <h2>{title}</h2>
          <div className="tile__content" dangerouslySetInnerHTML={{ __html: content }}></div>

          <div className="tile__cta">
            <Button>Launch</Button>

            <div className="tile__cta__secondary">
              <Button size="sm">Blog</Button>
              <Button size="sm">Code</Button>
            </div>
          </div>
        </div>

        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default Tile;
