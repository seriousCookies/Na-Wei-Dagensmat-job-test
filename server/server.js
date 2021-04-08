const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const productAPI = require('./api/product');
const productsAPI = require('./api/products');

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use('/api', productAPI);
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
