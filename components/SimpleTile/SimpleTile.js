import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SimpleTile.css';
import Link from '../Link';
// import Button from '../Button';

class SimpleTile extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    slug: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
    // content: PropTypes.string,
  }

  render() {
    const {
      title,
      subtitle,
      slug,
      imageUrl,
      // content,
      // imageAltText,
    } = this.props;

    return (
      <article className="simple-tile simple-tile--tall">

        <Link to={`/post/${slug}`}>
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
          {/* <div className="simple-tile__content" dangerouslySetInnerHTML={{ __html: content }}></div> */}

          {/* <div className="simple-tile__cta">
            <Button content="Launch" />

            <div className="simple-tile__cta__secondary">
              <Button content="Blog" size="sm" />
              <Button content="Code" size="sm" />
            </div>
          </div> */}
        </div>

        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default SimpleTile;
