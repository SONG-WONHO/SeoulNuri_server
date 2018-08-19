const express = require('express');
const router = express.Router();
const mypageRouter = require('./mypage/index');
const courseRouter = require('./course/index');

router.use('/mypage', mypageRouter);
router.use('/course',courseRouter);



module.exports = router;
