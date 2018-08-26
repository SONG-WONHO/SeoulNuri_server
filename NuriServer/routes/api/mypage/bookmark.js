const express = require('express');
const router = express.Router();
const bookmark = require('../../../module/bookmark/bookmark.js');

router.get('/', async (req,res,next)=>{
    console.log(1);
    let bookmarkList;
    try {
        
        bookmarkList = await bookmark.get_bookmark("course",req.user_idx);
        console.log(bookmarkList[0]);
    } catch (err) {
        next("err");
        return;
    }
    res.r(bookmarkList);
});

module.exports = router;