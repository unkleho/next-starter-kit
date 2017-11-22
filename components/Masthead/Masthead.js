import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Masthead.css';

class Button extends Component {

  static propTypes = {
    content: PropTypes.string,
    url: PropTypes.string,
    size: PropTypes.string,
  }

  render() {
    // const {
    //   url,
    //   content,
    //   size,
    // } = this.props;

    return (
      <div className="masthead">
        <div
          className="masthead__bg"
          style={this.props.backgroundImageUrl && {
            backgroundImage: `url(${this.props.backgroundImageUrl})`,
          }}
        ></div>

        {this.props.children}

        <style global jsx>{styles}</style>
      </div>
    );
  }

}

export default Button;
