const express = require('express');
const router = express.Router();
const mypage = require('../../../module/mypage/mypage.js');
/* GET home page. */



//라우터 모듈
const bookmarkRouter = require('./bookmark');
router.use('/bookmark', bookmarkRouter);

//
router.post('/',async(req,res,next)=>{
    let handiList = req.body.handi_type;
    if(handiList.length===0){
        next("400");
        return;
    }
    let result = await mypage.post_handiType(handiList,req.user.user_idx);
    console.log(result);
    if(result === false){
        next("500");
        return;
    }
    res.r();
});
router.get('/',async(req,res,next)=>{
    let result;
    try {
            result = await mypage.get_mypage(req.user.user_idx);
            if(typeof result ==="string"){
                next(result)
                return;
            }


        
    } catch (err) {
        next(err);
        return;
    }
    res.r(result);

})

module.exports = router;
