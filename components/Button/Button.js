import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Button.css';
import Link from '../Link';

class Button extends Component {

  static propTypes = {
    content: PropTypes.string,
    url: PropTypes.string,
  }

  render() {
    const {
      // content,
      url,
      content,
    } = this.props;

    return (
      <Link to={url}>
        <a>
          {content}

          <style jsx>{styles}</style>

        </a>
      </Link>
    );
  }

}

export default Button;
