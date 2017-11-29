import { Component } from 'react';

import styles from './ExampleComponent.css';

class ExampleComponent extends Component {

  render() {
    return (
      <div class="example-component">
        <style jsx>{styles}</style>
      </div>
    )
  }

}

export default ExampleComponent;
