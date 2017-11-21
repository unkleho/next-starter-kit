import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SectionTitle.css';

class SectionTitle extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    const {
      title,
    } = this.props;

    return (
      <h2 className="section-title">
        {title}
        <style jsx>{styles}</style>
      </h2>
    );
  }

}

export default SectionTitle;
