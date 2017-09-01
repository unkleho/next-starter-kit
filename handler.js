'use strict';

process.env.IN_LAMBDA = '1';
process.env.NODE_ENV = 'production';

const { createServer, proxy } = require('aws-serverless-express');
const app = require('./server.js');

const server = createServer(app);

exports.next = (event, context) => {
  return proxy(server, event, context);
}
