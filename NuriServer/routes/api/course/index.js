const express = require('express');
const router = express.Router();

//라우터 모듈 임포트
const commentRouter = require('./comment');
router.use('/comment', commentRouter);

//module
const course_star = require('../../../module/course/course_star');

/* GET home page. */
router.get('/', async (req, res, next) => {

    let star;

    try {
        star = await course_star.get_star();
    } catch (err) {
        next(err);
        return;
    }

    res.r(star);

});

module.exports = router;
