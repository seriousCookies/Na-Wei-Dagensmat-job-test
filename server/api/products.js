const express = require('express');
const router = express.Router();
const products = require('../db');

const categoryExist = (category) => {
  if (category !== undefined) {
    products.some((product) => product.category.toString() == category);
  }
};
const pricevalidator = (price) => {
  if (price !== undefined) {
    return isNaN(price);
  }
};

const queryChecker = async (req, res, next) => {
  const { category, minPrice, maxPrice } = req.query;
  categoryExist(category) === false && res.json('that category does not exist');
  (pricevalidator(maxPrice) || pricevalidator(minPrice)) &&
    res.json('Please enter a valid price range');
  next();
};

const filterSearch = async (req, res, next) => {
  req.result = products;
  const filterCategory = (product) =>
    req.query.category
      ? product.category.toString() === req.query.category
      : product;
  const filterMaxPrice = (product) =>
    req.query.maxPrice ? product.price < req.query.maxPrice : product;
  const filterMinPrice = (product) =>
    req.query.minPrice ? product.price > req.query.minPrice : product;
  req.result = products
    .filter(filterCategory)
    .filter(filterMaxPrice)
    .filter(filterMinPrice);
  next();
};
const pagination = (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 24;
  req.endIndex = page * limit;
  req.startIndex = (page - 1) * limit;
  next();
};

router.use(filterSearch);
router.use(queryChecker);
router.use(pagination);
router.get('/', (req, res) => {
  const result = {
    totalResults: req.result.length,
    displayedResults: `${req.startIndex} to ${req.endIndex}`,
    result: req.result.slice(req.startIndex, req.endIndex),
  };
  res.json(result);
});

module.exports = router;
