import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import TileImage from '../TileImage';
// import Button from '../Button';
import TileButtonGroup from '../TileButtonGroup';
import styles from './Tile.css';

class Tile extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    url: PropTypes.string,
    secondaryUrl: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
    content: PropTypes.string,
    size: PropTypes.string,
  }

  render() {
    const {
      title,
      subtitle,
      url,
      imageUrl,
      content,
      size,
      secondaryUrl,
      tertiaryUrl,
      // imageAltText,
    } = this.props;

    return (
      // <article className="tile tile--tall">
      <article className={`tile ${size && `tile--${size}`}`}>

        <TileImage
          imageUrl={imageUrl}
          url={url}
          className="tile__image"
        />

        <div className="tile__info">
          <header>
            <h1 className="tile__title">
              <Link to={url}><a>{title}</a></Link>
            </h1>
            <div className="tile__subtitle">{subtitle}</div>
          </header>

          <div className="tile__content" dangerouslySetInnerHTML={{ __html: content }}></div>

          <div className="tile__cta">
            <TileButtonGroup
              primaryUrl={url}
              primaryText={secondaryUrl ? 'Launch' : 'Read'}
              secondaryUrl={secondaryUrl}
              secondaryText={secondaryUrl && 'Read'}
              tertiaryUrl={tertiaryUrl}
              tertiaryText={tertiaryUrl && 'Code'}
            />
          </div>
        </div>

        {/* TODO: CSS is targeting Button, hence why it is global. Need to add appropriate styles to Button so global can be removed. */}
        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default Tile;
