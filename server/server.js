const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const products = require('./db');
const productsAPI = require('./api/products');
const productAPI = require('./api/product');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/products', productsAPI);

http.createServer(app).listen(3001, () => {
  console.log('Listen on 0.0.0.0:3001');
});

// app.get('/', (_, res) => {
//   res.send({ status: 200 });
// });

process.on('SIGINT', function () {
  process.exit();
});
