const express = require('express');
const router = express.Router();
const searchRouter = require('./search/index');

router.use('/search',searchRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;