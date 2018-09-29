const express = require('express');
const router = express.Router();

//module
const locationTour = require('../../../../module/tour/locationTour')

/* GET home page. */
router.get('/', async(req, res, next) => {
let result = await locationTour.get_arround_location_tour(6)
	// try {

	// 	let result = await locationTour.get_arround_location_tour(6)


	// } catch (err) {
	// 	next(err)
	// 	return
	// }

	// res.r(data)

});

module.exports = router;