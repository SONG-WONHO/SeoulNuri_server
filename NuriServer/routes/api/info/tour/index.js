const express = require('express');
const router = express.Router();

//라우터 모듈 임포트
const commentRouter = require('./comment');
router.use('/comment', commentRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;
