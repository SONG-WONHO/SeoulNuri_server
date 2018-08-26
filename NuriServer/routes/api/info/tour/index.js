const express = require('express');
const router = express.Router();

//라우터 모듈 임포트
const commentRouter = require('./comment');
const bookmarkRouter = require('./bookmark');

router.use('/comment', commentRouter);
router.use('/bookmark', bookmarkRouter);



/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;
