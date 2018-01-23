import { Component } from 'react';

import App from '../components/App';

class SearchPage extends Component {

  render() {

    return (
      <App>
        <div className="posts container container--lg">
          <SectionTitle>Page not found!</SectionTitle> 
        </div>
      </App>
    );
  }

}

export default withData(Four04); // I have no idea what I am doing...
