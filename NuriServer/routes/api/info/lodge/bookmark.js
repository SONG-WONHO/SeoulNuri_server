const express = require('express');
const router = express.Router();

const bookmark = require("../../../../module/bookmark/bookmark");

router.post('/',async(req,res,next)=>{
    let result;
    try {
        let lodgeIdx = req.body.lodge_idx;
        result = await bookmark.post_bookmark("lodge",lodgeIdx,req.user.user_idx);
        if(!lodgeIdx){
            next("400");
            return;
        }
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