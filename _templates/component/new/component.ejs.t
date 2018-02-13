---
to: components/<%= name %>/<%= name %>.js
---
import { Component } from 'react';
// import PropTypes from 'prop-types';

import './<%= name %>.css';

class <%= name %> extends Component {
  // static propTypes = {};

  render() {
    // const {} = this.props;

    return (
      <div className="<%= h.inflection.underscore(name).replace(/_/g, '-') %>"></div>
    )
  }
}

export default <%= name %>
