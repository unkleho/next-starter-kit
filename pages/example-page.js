import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './example-page.css';
import withData, { createApolloReduxStore } from '../lib/withData';
import App from '../components/App';
import Header from '../components/Header';
import { exampleAction } from '../actions/exampleActions';

class ExamplePage extends Component {

  static propTypes = {
    id: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
    };
  }

  static getInitialProps ({ query: { id = null }, serverState }) {
    const store = createApolloReduxStore(serverState);
    store.dispatch(exampleAction('payload'));

    return {
      id,
    }
  }

  render() {
    const {
      id,
      url,
    } = this.props;

    const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 'xxlg'];
    // const shades = ['lightest', 'lighter', 'light', '', 'dark', 'darker', 'darkest'];

    return(
      <App>

        <Header pathname={url.pathname}></Header>

        <h1 className="title">Page <span>{id}</span></h1>

        <h2>Style Guide</h2>
        <h3>Type Scale</h3>
        {sizes.map(size => (
          <p className={`font-size-${size}`} key={`font-size-${size}`}>{`font-size-${size}`}</p>
        ))}

        <h3>Colours</h3>
        <div className="boxes">
          <div className="box box--colour-primary"></div>
          <div className="box box--colour-primary-dark"></div>
          <div className="box box--colour-primary-darker"></div>
          <div className="box box--colour-primary-darkest"></div>
        </div>

        <h2>Lost Grid</h2>
        <div className="boxes">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </div>

        <h2>dotenv TEST</h2>
        <p>{process.env.TEST}</p>

        <style jsx>{styles}</style>

      </App>
    )
  }

}

export default withData(ExamplePage);
