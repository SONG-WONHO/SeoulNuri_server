const express = require('express');
const router = express.Router();
const starMD = require('../../../../module/star/star.js');
//module



router.post('/',async(req,res,next)=>{
    try {
        let tourIdx = req.body.tour_idx;
        let star = req.body.star;
        console.log(req.body);
        if(!tourIdx || !star){
            next("400");
            return;
        }
        let result = await starMD.post_star("tour",tourIdx,req.user_idx,star);
        
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