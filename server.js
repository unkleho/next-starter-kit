// 'use strict'
//
// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');
// const pathMatch = require('path-match');
//
// const dev = process.env.NODE_ENV !== 'production';
// const port = process.env.PORT || 3000;
// const app = next({ dev });
// const handle = app.getRequestHandler();
// const route = pathMatch();
// const match = route('/example-page/:id');
//
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

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

function createServer() {
  const server = express();
  // add middleware, custom routing, whatever
  server.get('*', (req, res) => handle(req, res));
  return server;
}

if (process.env.IN_LAMBDA) {
  module.exports = createServer();
} else {
  app.prepare().then(() => {
    const server = createServer();
    server.listen(port);
  });
}
