const express = require('express');
const router = express.Router();

const a = require('../../../../module/tour/filterTour')

router.get('/', async(req,res,next)=>{

 let b = await a.get_filter_tour([1,2,3,4],[0,2,10,20,22, 31])	

})

// /* GET home page. */
// router.get('/', (req, res, next) => {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
