import { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import styles from './TileButtonGroup.css';

class TileButtonGroup extends Component {

  static propTypes = {
    primaryUrl: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryUrl: PropTypes.string,
    secondaryText: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryText: PropTypes.string,
  }

  render() {
    const {
      primaryUrl,
      primaryText,
      secondaryUrl,
      secondaryText,
      tertiaryUrl,
      tertiaryText,
    } = this.props;

    return (
      <div className="tile-button-group tile-button-group--alt">
        <Button url={primaryUrl}>{primaryText}</Button>

        {secondaryText && (
          <Button url={secondaryUrl} size="sm">{secondaryText}</Button>
        )}

        {tertiaryText && (
          <Button url={tertiaryUrl} size="sm">{tertiaryText}</Button>
        )}

        {/* <div className="tile-button-group__small">
        </div> */}

        <style global jsx>{styles}</style>
      </div>
    );
  }

}

export default TileButtonGroup;
