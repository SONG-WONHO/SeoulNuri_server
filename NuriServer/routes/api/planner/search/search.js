const express = require('express');
const router = express.Router();
const search = require('../../../../module/search/search.js');


//검색창 키워드 넣었을 때
router.get('/keyword', async(req,res,next)=>{
    let result;

    try {
        let word = req.query.word || "";
    
        result = await search.get_search(word);
        if(!result){
            next("500");
            return;
        }
        
    } catch (err) {
        next(err);
        return;
    }

    res.r(result);
    



});


module.exports = router;
