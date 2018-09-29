const express = require('express')
const router = express.Router()
const planner = require('../../../../module/planner/planner');

router.get('/',async (req,res,next)=>{
    let tour_idx = req.query.tour_idx
    let data = {}

    try {
        if(!tour_idx){
            next("500")
            return;
        }

        let result = await planner.get_image_tour(tour_idx)

        data.tour_idx = tour_idx
        data.tour_planner_img = result
    } catch (err) {
        next(err);
        return;
    }

    res.r(data)
});


module.exports = router;