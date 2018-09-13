const express = require('express');
const router = express.Router();
const searchRouter = require('./search/index');

//module
const randomTour = require('../../../module/tour/randomTour')
const handitypeTour = require('../../../module/tour/handitypeTour')

router.use('/search',searchRouter);

/* GET home page. */
router.get('/', async(req, res, next) => {
	let handitype = req.handi_type // 배열
	let reco_tour
	let rand_tour
	let data = {}

	try {

		if(!handitype) {
			next("400")
			return
		}

		rand_tour = await randomTour.get_random_tour()
		reco_tour = await handitypeTour.get_handitype_reco_tour(handitype)

		data.reco_tour = reco_tour
		data.rand_tour = rand_tour

	} catch (err) {
		next(err)
		return
	}

	res.r(data)

});

module.exports = router;