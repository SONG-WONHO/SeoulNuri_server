const express = require('express');
const router = express.Router();

//module
const comment = require('../../../../module/comment/comment');

router.get('/', async (req, res, next) => {

    let commentList;

    try {
        let lodge_idx = req.query.lodge_idx;

        if (!lodge_idx) {
            next("400");
            return;
        }

        commentList = await comment.get_comment("lodge", lodge_idx);
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
        let lodge_idx = req.body.lodge_idx;
        let contents = req.body.contents;

        if (!lodge_idx || !contents) {
            next("400");
            return;
        }

        let result = await comment.post_comment("lodge", lodge_idx, req.user.user_idx, contents);

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