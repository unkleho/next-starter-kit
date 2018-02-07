import { Component } from 'react';
import PropTypes from 'prop-types';

import TileImage from '../TileImage';
import TileButtonGroup from '../TileButtonGroup';
import Link from '../Link';
// import Button from '../Button';
import styles from './DisplayTile.css';

class DisplayTile extends Component {
  static propTypes = {
    title: PropTypes.string,
    primaryUrl: PropTypes.string,
    primaryTarget: PropTypes.string,
    primaryText: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    size: PropTypes.oneOf(['2x1', '1x2']),
    secondaryUrl: PropTypes.string,
    secondaryTarget: PropTypes.string,
    secondaryText: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryTarget: PropTypes.string,
    tertiaryText: PropTypes.string,
  };

  render() {
    const {
      title,
      primaryUrl,
      primaryTarget,
      primaryText,
      imageUrl,
      content,
      date,
      size,
      secondaryUrl,
      secondaryTarget,
      secondaryText,
      tertiaryUrl,
      tertiaryTarget,
      tertiaryText,
    } = this.props;

    return (
      <article className={`display-tile ${size && `display-tile--${size}`}`}>
        <TileImage
          url={primaryUrl}
          target={primaryTarget}
          imageUrl={imageUrl}
          className="display-tile__image"
        />

        <div className="display-tile__info">
          <div className="display-tile__body">
            <header className="display-tile__header">
              <h1 className="display-tile__title">
                {/* TODO: Make this DRY! */}
                {primaryUrl.startsWith('http') ? (
                  <a href={primaryUrl} target={primaryTarget}>
                    {title}
                  </a>
                ) : (
                  <Link to={primaryUrl}>
                    <a target={primaryTarget}>{title}</a>
                  </Link>
                )}
              </h1>
              <div className="display-tile__date">{date}</div>
            </header>

            <div
              className="display-tile__content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div className="display-tile__cta">
            <TileButtonGroup
              primaryUrl={primaryUrl}
              primaryText={primaryText}
              primaryTarget={primaryTarget}
              secondaryUrl={secondaryUrl}
              secondaryTarget={secondaryTarget}
              secondaryText={secondaryText}
              tertiaryUrl={tertiaryUrl}
              tertiaryText={tertiaryText}
              tertiaryTarget={tertiaryTarget}
            />
          </div>
        </div>

        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
      </article>
    );
  }
}

export default DisplayTile;
