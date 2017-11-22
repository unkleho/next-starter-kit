const routes = require('next-routes')();

routes
  .add('example-page', '/example-page/:id')
  .add('post', '/post/:slug')
  .add('page', '/:slug');

module.exports = routes;
