require('dotenv').config();

const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const uaCompatible = require('ua-compatible');
const helmet = require('helmet');

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

    // Add Security headers
    server.use(helmet());

    // Adds X-UA-Compatible: IE=edge, chrome=1 header for our IE friends.
    server.use(uaCompatible);

    server.enable('strict routing');

    // Proxy external apps
    Object.keys(proxyRoutes).forEach((route) => {
      // Proxy route to DX Lab WP Server
      server.use(proxy(route, proxyRoutes[route]));

      // But also redirect it to route with trailing slash.
      // Plays nice with proxying to Nginx WP server
      server.get(route.slice(0, -1), (req, res) => {
        res.redirect(`${route.slice(0, -1)}/`);
      });
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

    server.get('/open-data/', (req, res) => {
      res.redirect('/code');
    });

    server.get('/fellowships', (req, res) => {
      res.redirect('/grants');
    });

    server.get('/fellowships/', (req, res) => {
      res.redirect('/grants');
    });

    server.get('/unstacked', (req, res) => {
      res.redirect('http://unstacked.dxlab.sl.nsw.gov.au');
    });

    server.get('/unstacked/', (req, res) => {
      res.redirect('http://unstacked.dxlab.sl.nsw.gov.au');
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
