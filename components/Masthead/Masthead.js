import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Masthead.css';
import glitchStyles from '../../styles/glitch.css';

class Masthead extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    titleSmall: PropTypes.string,
    titleHighlight: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    sideText: PropTypes.string,
    backgroundImageUrl: PropTypes.string,
    size: PropTypes.string,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div
        className={`masthead ${
          this.props.size ? `masthead--${this.props.size}` : ''
        } ${this.props.className ? this.props.className : ''}`}
      >
        <div
          className="masthead__bg"
          style={
            this.props.backgroundImageUrl && {
              backgroundImage: `url(${this.props.backgroundImageUrl})`,
            }
          }
        />

        <div
          className={`masthead__content container container--${
            this.props.size ? 'lg' : 'lg'
          }`}
        >
          {this.props.subtitle && (
            <div className="masthead__subtitle">{this.props.subtitle}</div>
          )}

          <h1 className="masthead__title">
            <span className="masthead__title__small">
              {this.props.titleSmall}
            </span>
            <span
              className="masthead__title__main glitch"
              data-text={this.props.title}
            >
              {this.props.title}
            </span>
            <span className="masthead__title__highlight">
              {this.props.titleHighlight}
            </span>
          </h1>

          {this.props.text && (
            <p className="masthead__intro-text">{this.props.text}</p>
          )}

          <p className="masthead__intro-list">{this.props.sideText}</p>

          {this.props.caption && (
            <div className="masthead__caption">{`_${this.props.caption}`}</div>
          )}
        </div>

        {/* {this.props.children} */}

        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
        {/* prettier-ignore */}
        <style global jsx>{glitchStyles}</style>
      </div>
    );
  }
}

export default Masthead;
