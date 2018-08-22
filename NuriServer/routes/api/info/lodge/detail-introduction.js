const express = require('express');
const router = express.Router();

//module
const lodge_detail = require('../../../../module/lodge/lodge_detail');

//숙박 디테일 라우터
router.get('/', async (req, res, next) => {

    //숙박 업체에 대한 디테일 정보
    let lodge;

    try{

        let lodge_idx = req.query.lodge_idx;

        if (!lodge_idx) {
            next("400");
            return;
        }

        lodge = await lodge_detail.get_lodge_detail(lodge_idx, req.user_idx);
        //undefined 경우 catch 에서 안잡혀서 아래와 같이 undefined 검출!!
        console.log(lodge[0]);
    }

    catch (err) {
        console.log(err);
        next(err);
        return;
    }

    //결과전달
    res.r(lodge[0]);

});

module.exports = router;