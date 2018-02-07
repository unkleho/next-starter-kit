import { Component } from 'react';
import Masthead from '../components/Masthead';
import App from '../components/App';
// import rolloverShuffle from '../lib/rolloverShuffle.js';

class Four04 extends Component {
  // componentDidMount() {
  // init();
  // }

  componentDidMount() {
    //  rolloverShuffle();
  }

  render() {
    return (
      <App>
        <Masthead
          subtitle="Welcome to the DX Lab:"
          titleSmall="The State Library of NSW's"
          title="Experimental"
          titleHighlight="Innovation Lab"
          text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
          // sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
          backgroundImageUrl="/static/images/masthead-background-01.gif"
          slug="Experimental"
          size="lg"
          caption="Loom Atlas view"
        />
        <div className="masthead__content container container--lg">
          <h1 className="masthead__title">
            <span className="masthead__title__small">this is a test page</span>
            <br />
            <span className="masthead__title__main">yes really it is</span>
            <br />
            <span className="masthead__title__highlight">Experiments</span>
          </h1>
          <p className="masthead__intro-list" />
        </div>
      </App>
    );
  }
}

export default Four04;
