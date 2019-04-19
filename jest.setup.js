import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// next/router tries to assign this, but JSDom can't find it, so we assign it here.
window.scrollTo = undefined;
