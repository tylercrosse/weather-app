const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const router = require('./config/routes');

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '127.0.0.1';

// Middleware
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/', router);

// Listen for requests
app.listen(PORT, HOST, err => {
  if (err) {
    console.log('server failed to start ❌', err);
  }
  console.log(`==> 🌎 Listening at http://${HOST}:${PORT}`);
});

module.exports = app;
