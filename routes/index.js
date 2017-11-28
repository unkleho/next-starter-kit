const routes = require('next-routes')();

routes
  .add('example-page', '/example-page/:id')
  .add('blog', '/blog')
  .add('post', '/blog/:slug')
  .add('page', '/:slug');

module.exports = routes;
