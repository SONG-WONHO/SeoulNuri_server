const express = require('express');
const router = express.Router();

const handi_type_reco = require('../../../../module/tour/randomTour')

router.get('/', async (req, res, next) => {
	let test

	test = await handi_type_reco.get_random_tour()
})
// /* GET home page. */
// router.get('/', (req, res, next) => {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
