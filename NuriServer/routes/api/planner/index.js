const express = require('express');
const router = express.Router();
const plannerRouter = require('./planner');


router.use('/',plannerRouter);
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;
