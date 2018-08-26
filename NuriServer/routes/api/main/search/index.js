const express = require('express');
const router = express.Router();

const handi_type_reco = require('../../../../module/tour/detailTour')

router.get('/', async (req, res, next) => {
	let test

	test = await handi_type_reco.get_intro_tour(1)
})
// /* GET home page. */
// router.get('/', (req, res, next) => {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
