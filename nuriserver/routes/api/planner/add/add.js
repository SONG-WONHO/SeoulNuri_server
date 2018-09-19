const express = require('express')
const router = express.Router()
const planner = require('../../../../module/planner/planner')

router.post('/', async(req,res,next) =>{
	let user_idx = req.user_idx
	let plan_date = req.body.plan_date
	let tour_idx = req.body.tour_idx
	let data = {}
	console.log(user_idx);
	console.log(tour_idx);
	console.log(plan_date);

	try {
		
		if(!user_idx || !plan_date || !tour_idx){
			next("400");
			return
		}
		
		let result = await planner.add_plan(user_idx, plan_date,tour_idx)
		data.plan_idx = result

	} catch (err) {
		next(err)
		return
	}
	res.r(data)
})

module.exports = router