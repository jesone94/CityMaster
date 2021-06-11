const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));

const buildHTML = path.resolve(__dirname, '../city-master/build/index.html');
const buildState = path.resolve(__dirname, '../city-master/build/');

app.use(express.static(buildState));

app.get('*', (_, res) => {
  res.sendFile(buildHTML);
});

app.listen(8080, () => {
  console.log('Server started at port 8080');
});
