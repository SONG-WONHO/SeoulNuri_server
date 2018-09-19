const express = require('express');
const router = express.Router();

//module
const comment = require('../../../../module/comment/comment');

router.get('/', async (req, res, next) => {

    let commentList;

    try {
        let tour_idx = req.query.tour_idx;

        if (!tour_idx) {
            next("400");
            return;
        }

        commentList = await comment.get_comment("tour", tour_idx);
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
        let tour_idx = req.body.tour_idx;
        let contents = req.body.contents;

        if (!tour_idx || !contents) {
            next("400");
            return;
        }

        let result = await comment.post_comment("tour", tour_idx, req.user.user_idx, contents);

        if (!result) {
            next("500");
            return
        }
    }

    catch (err) {
        next("err");
        return;
    }

    res.r();
});

module.exports = router;