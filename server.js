require('dotenv').config();

const express = require("express");
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');
// const proxy = require('express-http-proxy');
const proxy = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production' && !process.env.NOW;
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const match = route('/example-page/:id');

console.log('----------------------------------');
console.log('Environment Variables:');
console.log('----------------------------------');
console.log(`PORT=${process.env.PORT}`);
console.log(`GRAPHQL_URL=${process.env.GRAPHQL_URL}`);
console.log(`TEST=${process.env.TEST}`);
console.log('----------------------------------');

console.log('hi');

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
    
    // server.use('/proxy', proxy('dxlab.sl.nsw.gov.au', {
    //   proxyReqPathResolver: function(req) {
    //     console.log(require('url').parse(req.url).path);
    //     return require('url').parse(req.url).path;
    //     // return '/pa';
    //   }
    // }));

    server.all("*", (req, res) => handle(req, res));

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
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
