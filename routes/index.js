const routes = require('next-routes')();

routes
  .add('example-page', '/example-page/:id')
  .add('blog', '/blog')
  .add('experiments', '/experiments')
  .add('search', '/search')
  .add('post', '/blog/:slug')
  .add('page', '/:slug');

module.exports = routes;
