const express = require('express')
const router = express.Router()
const planner = require('../../../../module/planner/planner');

router.delete('/', async (req,res,next)=>{
    let planIdx = req.body.plan_idx;
    console.log("planIdx ="+planIdx);

    try {
        if(!planIdx){
            console.log("Null planIdx");
            next("400");
            return;
        }
        let result = await planner.delete_plan(req.user.user_idx, planIdx);
        if(!result || result === false){
            next("500");
            return;
        }
        
    } catch (err) {
        next(err);
        return;
        
    }
    res.r();

    



});

module.exports = router