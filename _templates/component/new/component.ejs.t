---
to: components/<%= name %>/<%= name %>.js
---
import * as React from 'react';
import PropTypes from 'prop-types';

import './<%= name %>.css';

const <%= name %> = ({ className }) => {
	return <div className={['<%= h.inflection.underscore(name).replace(/_/g, '-') %>', className || ''].join(' ')}> </div>;
};

<%= name %>.propTypes = {
	className: PropTypes.string,
};

export default <%= name %>;
