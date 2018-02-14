import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import TileImage from '../TileImage';
import Button from '../Button';
import TileButtonGroup from '../TileButtonGroup';
import styles from './MainTile.css';

class MainTile extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showTitleButton: PropTypes.bool,
    url: PropTypes.string,
    target: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    secondaryUrl: PropTypes.string,
    secondaryTarget: PropTypes.string,
    tertiaryText: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryTarget: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
    content: PropTypes.string,
    size: PropTypes.string,
  };

  render() {
    const {
      title,
      subtitle,
      showTitleButton,
      url,
      target,
      imageUrl,
      content,
      size,
      primaryText,
      secondaryText,
      secondaryUrl,
      secondaryTarget,
      tertiaryText,
      tertiaryUrl,
      tertiaryTarget,
      // imageAltText,
    } = this.props;

    return (
      <article className={`main-tile ${size && `main-tile--${size}`}`}>
        <TileImage
          imageUrl={imageUrl}
          url={url}
          target={target}
          className="main-tile__image"
          ariaLabel={title}
        />

        <div className="main-tile__info">
          <header className="main-tile__header">
            <h1 className="main-tile__title">
              {url && url.match('^http') ? (
                <a href={url} target={target}>
                  {title}
                </a>
              ) : (
                <Link to={url}>
                  <a target={target}>{title}</a>
                </Link>
              )}
            </h1>
            <div className="main-tile__subtitle">{subtitle}</div>
            {showTitleButton && (
              <div className="main-tile__title-button">
                <Button>Launch Experiment</Button>
              </div>
            )}
          </header>

          <div
            className="main-tile__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="main-tile__cta">
            <TileButtonGroup
              primaryUrl={showTitleButton ? '' : url}
              primaryText={primaryText}
              // primaryText={secondaryUrl ? 'Read' : 'Launch'}
              primaryTarget={target}
              secondaryUrl={secondaryUrl}
              secondaryText={secondaryText}
              secondaryTarget={secondaryTarget}
              tertiaryUrl={tertiaryUrl}
              tertiaryText={tertiaryText}
              tertiaryTarget={tertiaryTarget}
            />
          </div>
        </div>

        {/* TODO: CSS is targeting Button, hence why it is global. Need to add appropriate styles to Button so global can be removed. */}
        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
      </article>
    );
  }
}

export default MainTile;
