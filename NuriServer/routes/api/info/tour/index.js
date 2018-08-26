const express = require('express');
const router = express.Router();

//module
const filterTour = require('../../../../module/tour/filterTour')

//라우터 모듈 임포트
const commentRouter = require('./comment');
router.use('/comment', commentRouter);

/* GET home page. */
router.get('/', async(req, res, next) => {
	let handi_type = req.query.handi_type // string
	let filter = req.query.filter
	let data

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
