import { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './SectionTitle.css';

class SectionTitle extends Component {
  render() {
    const { children } = this.props;

    return (
      <h2 className="section-title">
        {children}

        <style jsx>{styles}</style>
      </h2>
    );
  }
}

export default SectionTitle;
