const express = require('express');
const router = express.Router();
const products = require('../db');
const { pagination, filterSearch } = require('./helpers');

const findProductDetails = (req, res, next) => {
  req.product = products.filter((product) => product.id === req.params.id);
  if (req.product.length === 0) {
    res.json('that ID does not exist');
  }
  req.query.category = req.product[0].category;
  next();
};

const closestPrices = (req, res, next) => {
  req.sortedResults = req.result.sort(
    (a, b) =>
      Math.abs(req.product.price - a.price) -
      Math.abs(req.product.price - b.price)
  );

  next();
};
const idgenerator = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

router.use(pagination);
router.post('/:create', (req, res) => {
  const newProduct = req.body;
  newProduct.id = idgenerator();
  products.push(newProduct);
  res.send(req.body);
});

router.get(
  '/:id',
  pagination,
  findProductDetails,
  filterSearch,
  closestPrices,
  (req, res) => {
    const result = {
      product: req.product[0],
      totalResults: req.sortedResults.length,
      displayedResults: `${req.startIndex} to ${req.endIndex}`,
      result: req.sortedResults.slice(1).slice(req.startIndex, req.endIndex),
    };
    res.json(result);
  }
);

module.exports = router;
