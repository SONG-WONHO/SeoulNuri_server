const express = require('express');
const router = express.Router();

const courseRouter = require('./course/index');
const infoRouter = require('./info/index');
const mainRouter = require('./main/index');
const mypageRouter = require('./mypage/index');
const userRouter = require('./user/index');

router.use('/course',courseRouter);
router.use('/info',infoRouter);
router.use('/main',mainRouter);
router.use('/mypage',mypageRouter);
router.use('/user',userRouter);

module.exports = router;
