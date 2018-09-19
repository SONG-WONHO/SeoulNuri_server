const express = require('express');
const router = express.Router();
const mypage = require('../../../module/mypage/mypage.js');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});


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


module.exports = router;
