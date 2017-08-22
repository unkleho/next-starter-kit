import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';
import withData from '../lib/withData';

export default withData((props) => (
  <ExampleApp>
    <Header pathname={props.url.pathname} />

    <h1>Next Starter Kit</h1>
  </ExampleApp>
))
