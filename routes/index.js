const routes = require('next-routes')();

routes
  .add('about', '/about')
  .add('experiments', '/experiments')
  .add('blog', '/blog')
  .add('grants', '/grants')
  .add('code', '/code')
  .add('search', '/search')
  .add('post', '/blog/:slug');

module.exports = routes;
