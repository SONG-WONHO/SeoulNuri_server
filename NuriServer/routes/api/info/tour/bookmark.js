const express = require('express');
const router = express.Router();
const bookmark = require('../../../../module/bookmark/bookmark.js');

router.post('/',async (req,res,next)=>{
    let result
    
    try {
        let tourIdx = req.body.tour_idx;
        if(!tourIdx){
            next("400");
            return;
        }
         result = await bookmark.post_bookmark("tour",tourIdx,req.user.user_idx);
        if(!result || result === false){
            next("500");
            return;
        }
    } catch (err) {
        next(err);
        return;
    }
    res.r(result);

});


module.exports = router;