const express = require('express');
const router = express.Router();
const { filterSearch, pagination, queryChecker } = require('./helpers');

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
