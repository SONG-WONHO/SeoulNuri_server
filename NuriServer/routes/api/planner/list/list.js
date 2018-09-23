const express = require('express')
const router = express.Router()
const planner = require('../../../../module/planner/planner');

router.get('/',async (req,res,next)=>{
    let result;
    try {

        result = await planner.get_planner_list(req.user.user_idx); 
        if(result === false || !result)
        {
            next("500");
            return;

        }
        
    } catch (err) {
        next(err);
        return;
    }
    res.r(result)
});


module.exports = router;