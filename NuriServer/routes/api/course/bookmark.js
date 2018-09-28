const express = require('express');
const router = express.Router();
const bookmark = require('../../../module/bookmark/bookmark.js');


router.post('/', async (req,res,next)=>{
    let result;
    try {
        let courseIdx = req.body.course_idx;
        console.log(courseIdx)
        console.log(req.user.user_idx)
        if(!courseIdx){
            next("400");
            return;
        }
        result = await bookmark.post_bookmark("course",courseIdx,req.user.user_idx);
        console.log(result);
        if(!result || result === false){
            next("500");
            return;
        }
        if(typeof result ==='string'){
            
            console.log(result);
            next(result);
            return;
        }

        
    } catch (err) {
        next(err);
        return;
        
    }
    res.r(result);
});



module.exports = router;