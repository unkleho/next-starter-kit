import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Masthead.css';

class Masthead extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    sideText: PropTypes.string,
    backgroundImageUrl: PropTypes.string,
    size: PropTypes.string,
  }

  render() {
    return (
      <div className={`masthead ${this.props.size && `masthead--${this.props.size}`}`}>
        <div
          className="masthead__bg"
          style={this.props.backgroundImageUrl && {
            backgroundImage: `url(${this.props.backgroundImageUrl})`,
          }}
        ></div>

        <div className={`masthead__content container container--${this.props.size ? this.props.size : 'md'}`}>
          {this.props.subtitle && (
            <h2 className="masthead__subtitle">{this.props.subtitle}</h2>
          )}

          <h1 className="masthead__title">{this.props.title}</h1>

          {this.props.text && (
            <p className="masthead__intro-text">{this.props.text}</p>
          )}

          <p className="masthead__intro-list">{this.props.sideText}</p>
        </div>

        {/* {this.props.children} */}

        <style global jsx>{styles}</style>
      </div>
    );
  }

}

export default Masthead;
