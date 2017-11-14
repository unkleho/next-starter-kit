import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Tile.css';
import Link from '../Link';
import Button from '../Button';

class Tile extends Component {

  static propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const {
      title,
      slug,
      imageUrl,
      content,
      // imageAltText,
    } = this.props;

    return (
      <article className="tile">

        <Link to={`/post/${slug}`}>
          <a>
            <div style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '16em',
            }}></div>
          </a>
        </Link>

        <div className="tile__info">
          <h2>{title}</h2>
          <div className="tile__content" dangerouslySetInnerHTML={{ __html: content }}></div>

          <div className="tile__cta">
            <Button content="Launch" />
          </div>
        </div>


        <style global jsx>{styles}</style>

      </article>
    );
  }

}

export default Tile;
