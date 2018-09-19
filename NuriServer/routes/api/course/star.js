const express = require('express');
const router = express.Router();
const starMD = require('../../../module/star/star.js');
//module



router.post('/',async(req,res,next)=>{
    try {
        let courseIdx = req.body.course_idx;
        let star = req.body.star;
        console.log(req.body);
        if(!courseIdx || !star){
            next("400");
            return;
        }
        let result = await starMD.post_star("course",courseIdx,req.user.user_idx,star);
        
        if(!result || result === false){
            next("500");
            return;
        }
        res.r();
        
    } catch (err) {
        next(err);
        return;
        
    }

});



module.exports = router;