const express = require('express');
const router = express.Router();
const bookmark = require('../../../module/bookmark/bookmark.js');

router.get('/course', async (req,res,next)=>{
    
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

router.get('/tour', async (req,res,next)=>{
    
    let bookmarkList;
    try {
        
        bookmarkList = await bookmark.get_bookmark("tour",req.user_idx);
        console.log(bookmarkList[0]);
    } catch (err) {
        next("err");
        return;
    }
    res.r(bookmarkList);
});
module.exports = router;