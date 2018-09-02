const express = require('express');
const router = express.Router();

//module
const comment = require('../../../module/comment/comment');

router.get('/', async (req, res, next) => {

    let commentList;

    try {
        let course_idx = req.query.course_idx;

        if (!course_idx) {
            next("400");
            return;
        }

        commentList = await comment.get_comment("course", course_idx);
        console.log(commentList[0]);
    }

    catch (err) {
        next(err);
        return;
    }

    res.r(commentList);
});

router.post('/', async (req, res, next) => {

    try {
        let course_idx = req.body.course_idx;
        let contents = req.body.contents;

        if (!course_idx || !contents) {
            next("400");
            return;
        }

        let result = await comment.post_comment("course", course_idx, req.user_idx, contents);

        if (!result) {
            next("500");
            return
        }
    }

    catch (err) {
        next(err);
        return;
    }

    res.r();
});

module.exports = router;