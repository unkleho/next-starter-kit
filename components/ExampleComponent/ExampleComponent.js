import { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './ExampleComponent.css';

class ExampleComponent extends Component {
  // static propTypes = {
  // }

  render() {
    return (
      <div class="example-component">
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ExampleComponent;
