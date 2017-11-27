import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Button.css';
import Link from '../Link';

class Button extends Component {

  static propTypes = {
    url: PropTypes.string,
    size: PropTypes.string,
  }

  render() {
    const {
      children,
      url,
      size,
    } = this.props;

    return (
      <Link to={url}>
        <a className={`button ${size ? `button--${size}` : ''}`}>
          {children}

          <style jsx>{styles}</style>
        </a>
      </Link>
    );
  }

}

export default Button;
