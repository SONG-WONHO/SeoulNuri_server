const express = require('express');
const router = express.Router();

//라우터 모듈 임포트
const detailIntroductionRouter = require('./detail-introduction');
router.use('/detail-introduction', detailIntroductionRouter);

//라우터 모듈 임포트
const commentRouter = require('./comment');
router.use('/comment', commentRouter);

//라우터 모듈 임포트
const starRouter = require('./star');
router.use('/star',starRouter);

const bookmark = require('./bookmark');
router.use('/bookmark',bookmark);
//module
const lodge = require('../../../../module/lodge/lodge');



//숙박리스트 라우터
router.get('/', async (req, res, next) => {

    //숙박리스트
    let lodgeList;

    //숙박리스트 가져오기
    try {
        lodgeList = await lodge.get_lodge();
        //undefined 경우 catch 에서 안잡혀서 아래와 같이 undefined 검출!!
        console.log(lodgeList[0]);
    }

    catch(err) {
        next(err);
        return;
    }

    //결과전달
    res.r(lodgeList);

});

module.exports = router;
