const express = require('express');
const router = express.Router();

const a = require('../../../../module/tour/filterTour')
const search = require('../../../../module/search/search.js');


router.get('/', async(req,res,next)=>{

 let b = await a.get_filter_tour([1,2,3,4],[0,2,10,20,22, 31])	

})

//메인에서 검색창 키워드 넣었을 때
router.get('/keyword', async(req,res,next)=>{

    try {
        let word = req.query.word || "";
    
        let result = await search.get_search(word);
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

// /* GET home page. */
// router.get('/', (req, res, next) => {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
