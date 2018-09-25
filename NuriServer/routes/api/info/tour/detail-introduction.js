const express = require('express');
const router = express.Router();

//module
const detailTour = require('../../../../module/tour/detailTour');

router.get('/', async (req, res, next) => {
	let tour_idx = req.query.tour_idx
	let user_idx = req.user.user_idx

	let data = {}
	try {
		if(!tour_idx || !user_idx) {
			next("400")
			return
		}

		let tour_common = await detailTour.get_common_tour(tour_idx, user_idx)
		let tour_bottom = await detailTour.get_intro_tour(tour_idx)

		if(!tour_common || !tour_bottom){
			next("400")
			return
		}

		data.tour_common = tour_common
		data.tour_bottom = tour_bottom

	} catch (err) {
		next(err)
		return
	}

	res.r(data)
});

module.exports = router;
