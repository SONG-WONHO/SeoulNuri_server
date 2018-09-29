const express = require('express');
const router = express.Router();

//module
const locationTour = require('../../../../module/tour/locationTour')

/* GET home page. */
router.get('/', async(req, res, next) => {
	let tour_idx = req.query.tour_idx
	let result
	try {

		if(!tour_idx){
			next("500")
			return
		}

		result = await locationTour.get_arround_location_tour(tour_idx)

	} catch (err) {
		next(err)
		return
	}

	res.r(result)
});

module.exports = router;