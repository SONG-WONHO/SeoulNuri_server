const express = require('express');
const router = express.Router();

//module
const filterTour = require('../../../../module/tour/filterTour')

//라우터 모듈 임포트
const commentRouter = require('./comment');
const bookmarkRouter = require('./bookmark');
const detail_introduction_Router = require('./detail-introduction');
const detail_method_Router = require('./detail-method');
const detail_barrier_free_Router = require('./detail-barrier-free');
const starRouter = require('./star');


router.use('/comment', commentRouter);
router.use('/detail-introduction', detail_introduction_Router);
router.use('/detail-method', detail_method_Router);
router.use('/detail-barrier-free', detail_barrier_free_Router);
router.use('/bookmark', bookmarkRouter);
router.use('/star',starRouter);

/* GET home page. */
router.get('/', async(req, res, next) => {
	let handi_type = req.query.handi_type // string
	let filter = req.query.filter
	let data

	console.log(handi_type);
	console.log(filter);

	try {
		if(!handi_type || !filter){
			next("400")
			return
		}
		// string to array parsing
		handi_type = JSON.parse(handi_type)
		filter = JSON.parse(filter)
		
		data = await filterTour.get_filter_tour(handi_type, filter)
	} catch (err) {
		next(err);
		return
	}
	res.r(data)
});

module.exports = router;
