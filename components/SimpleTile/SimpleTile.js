import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SimpleTile.css';
import Link from '../Link';
// import Button from '../Button';

class SimpleTile extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
  }

  render() {
    const {
      title,
      subtitle,
      url,
      imageUrl,
      // imageAltText,
    } = this.props;

    return (
      <article className="simple-tile simple-tile--tall">

        <Link to={url}>
          <a
            className="simple-tile__image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          >
          </a>
        </Link>

        <div className="simple-tile__info">
          <p className="simple-tile__subtitle">{subtitle}</p>
          <h2 className="simple-tile__title">{title}</h2>
        </div>

        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default SimpleTile;
