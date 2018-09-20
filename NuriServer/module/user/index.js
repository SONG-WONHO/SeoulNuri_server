const express = require('express');
const router = express.Router();
const mypage = require('../../../module/mypage/mypage.js');



const signupRouter = require('./signup')
router.use('/signup', signupRouter)

router.post('/',async(req,res,next)=>{
    let result;

    try {
        let handiList = req.body.handi_type;
        console.log(handiList);
    if(handiList.length===0){
        next("400");
        return;
    }
    result = await mypage.post_handiType(handiList,req.user.user_idx);
    if(result === false){
        next("500");
        return;
    }
        
    } catch (err) {
        next(err);
        return;
        
    }
    
    res.r();
});

module.exports = router;