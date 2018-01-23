require('dotenv').config();

const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production' && !process.env.NOW;
const app = next({ dev });
const routes = require('./routes');
const proxyRoutes = require('./routes/proxyRoutes');
const redirectRoutes = require('./routes/redirectRoutes');

const handler = routes.getRequestHandler(app);

console.log('----------------------------------');
console.log('Environment Variables:');
console.log('----------------------------------');
console.log(`PORT=${process.env.PORT}`);
console.log(`GRAPHQL_URL=${process.env.GRAPHQL_URL}`);
console.log(`TEST=${process.env.TEST}`);
console.log(`DXLAB_URL=${process.env.DXLAB_URL}`);
console.log('----------------------------------');

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // Proxy external apps
    Object.keys(proxyRoutes).forEach((route) => {
      server.use(proxy(route, proxyRoutes[route]));
    });

    // Redirect old blog posts that had slug in root dir
    redirectRoutes.forEach((route) => {
      server.get(route, (req, res) => {
        res.redirect(`/blog${route}`);
      });
    });

    server.get('/', (req, res) => {
      if (req.query.s) {
        res.redirect(`/search?q=${req.query.s}`);
      } else {
        handler(req, res);
      }
    });

    // Redirects
    server.get('/open-data', (req, res) => {
      res.redirect('/code');
    });

    server.get('/fellowships', (req, res) => {
      res.redirect('/grants');
    });

    server.get('/example-page/:id', (req, res) => {
      const mergedQuery = Object.assign({}, req.query, req.params);
      return app.render(req, res, '/example-page', mergedQuery);
    });

    server.all('*', (req, res) => handler(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
