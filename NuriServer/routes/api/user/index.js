const express = require('express');
const router = express.Router();
const mypage = require('../../../module/mypage/mypage.js');

router.post('/',async(req,res,next)=>{
    let handiList = req.body.handi_type;
    if(handiList.length===0){
        next("400");
        return;
    }
    let result = await mypage.post_handiType(handiList,req.user_idx);
    if(result === false){
        next("500");
        return;
    }
    res.r();
});

module.exports = router;
