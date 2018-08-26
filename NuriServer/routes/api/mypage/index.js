const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});


//라우터 모듈
const bookmarkRouter = require('./bookmark');
router.use('/bookmark', bookmarkRouter);



module.exports = router;
