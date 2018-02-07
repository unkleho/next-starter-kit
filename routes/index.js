const routes = require('next-routes')();

routes.add('example-page', '/example-page/:id');

module.exports = routes;
