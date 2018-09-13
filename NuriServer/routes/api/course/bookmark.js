const express = require('express');
const router = express.Router();
const bookmark = require('../../../module/bookmark/bookmark.js');


router.post('/', async (req,res,next)=>{
    try {
        let courseIdx = req.body.course_idx;
        if(!courseIdx){
            next("400");
            return;
        }
        let result = await bookmark.post_bookmark("course",courseIdx,req.user_idx);
        if(!result){
            next("500");
            return;
        }

        
    } catch (err) {
        next("err");
        return;
        
    }
    res.r();
});



module.exports = router;