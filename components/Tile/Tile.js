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
    target: PropTypes.string,
    secondaryUrl: PropTypes.string,
    secondaryTarget: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryTarget: PropTypes.string,
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
      target,
      imageUrl,
      content,
      size,
      secondaryUrl,
      secondaryTarget,
      tertiaryUrl,
      tertiaryTarget,
      // imageAltText,
    } = this.props;

    return (
      // <article className="tile tile--tall">
      <article className={`tile ${size && `tile--${size}`}`}>

        <TileImage
          imageUrl={imageUrl}
          url={url}
          target={target}
          className="tile__image"
          ariaLabel={title}
        />

        <div className="tile__info">
          <header>
            <h1 className="tile__title">
              <Link to={url}><a target={target}>{title}</a></Link>
            </h1>
            <div className="tile__subtitle">{subtitle}</div>
          </header>

          <div className="tile__content" dangerouslySetInnerHTML={{ __html: content }}></div>

          <div className="tile__cta">
            <TileButtonGroup
              primaryUrl={url}
              primaryText={secondaryUrl ? 'Launch' : 'Read'}
              primaryTarget={target}
              secondaryUrl={secondaryUrl}
              secondaryText={secondaryUrl && 'Read'}
              secondaryTarget={secondaryTarget}
              tertiaryUrl={tertiaryUrl}
              tertiaryText={tertiaryUrl && 'Code'}
              tertiaryTarget={tertiaryTarget}
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
