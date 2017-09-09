require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');
const proxy = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production' && !process.env.NOW;
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const match = route('/example-page/:id');
const routes = require('./routes');
const handler = routes.getRequestHandler(app);

console.log('----------------------------------');
console.log('Environment Variables:');
console.log('----------------------------------');
console.log(`PORT=${process.env.PORT}`);
console.log(`GRAPHQL_URL=${process.env.GRAPHQL_URL}`);
console.log(`TEST=${process.env.TEST}`);
console.log('----------------------------------');

app
  .prepare()
  .then(() => {
    const server = express();

    // if (dev && devProxy) {
    //   const proxyMiddleware = require("http-proxy-middleware");
    //   Object.keys(devProxy).forEach(function(context) {
    //     server.use(proxyMiddleware(context, devProxy[context]));
    //   });
    // }

    server.use('/index/', proxy({
      target: 'http://dxlab.sl.nsw.gov.au',
      changeOrigin: true
    }));

    server.use('/pano-scope/', proxy({
      target: 'http://dxlab.sl.nsw.gov.au',
      changeOrigin: true
    }));

    server.get('/example-page/:id', (req, res) => {
      const mergedQuery = Object.assign({}, req.query, req.params)
      return app.render(req, res, '/example-page', mergedQuery);
    })

    server.all('*', (req, res) => handler(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

// app.prepare()
// .then(() => {
//   createServer((req, res) => {
//     const { pathname } = parse(req.url);
//     const params = match(pathname);
//
//     if (params === false) {
//       handle(req, res);
//       return;
//     }
//
//     app.render(req, res, '/example-page', params);
//   })
//   .listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   })
// });
