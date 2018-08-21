const express = require('express');
const router = express.Router();
const searchRouter = require('./search/index');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
  });
router.use('/search',searchRouter);
  

module.exports = router;
