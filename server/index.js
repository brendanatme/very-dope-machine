const path = require('path');
const express = require('express');
const compress = require('compression');
// TODO: implement favicon
// const favicon = require('serve-favicon');

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = 'dist';

/**
 * use middlewares
 */
app
  .use(compress())
  // TODO: implement favicon
  // .use(favicon(path.join(__dirname, PUBLIC_DIR, 'favicon.png')))
  .use(express.static(path.join(__dirname, '..', PUBLIC_DIR)));

/**
 * init server
 */
app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`); // eslint-disable-line
});
