import { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import styles from './TileButtonGroup.css';

class TileButtonGroup extends Component {
  static propTypes = {
    primaryUrl: PropTypes.string,
    primaryText: PropTypes.string,
    primaryTarget: PropTypes.string,
    secondaryUrl: PropTypes.string,
    secondaryText: PropTypes.string,
    secondaryTarget: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryText: PropTypes.string,
    tertiaryTarget: PropTypes.string,
  };

  render() {
    const {
      primaryUrl,
      primaryText,
      primaryTarget,
      secondaryUrl,
      secondaryText,
      secondaryTarget,
      tertiaryUrl,
      tertiaryText,
      tertiaryTarget,
    } = this.props;

    return (
      <div className="tile-button-group tile-button-group--alt">
        {primaryUrl && (
          <Button href={primaryUrl} target={primaryTarget}>
            {primaryText}
          </Button>
        )}

        {secondaryUrl && (
          <Button href={secondaryUrl} target={secondaryTarget} size="sm">
            {secondaryText}
          </Button>
        )}

        {tertiaryUrl && (
          <Button href={tertiaryUrl} target={tertiaryTarget} size="sm">
            {tertiaryText}
          </Button>
        )}

        {/* <div className="tile-button-group__small">
        </div> */}

        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
      </div>
    );
  }
}

export default TileButtonGroup;
