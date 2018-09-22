const express = require('express');
const router = express.Router();

const course = require('../../../module/course/course')

router.use('/',async(req,res,next)=>{

    let theme = req.query.course_theme;
    let result;
    try {
        if(!theme){
            next("400");
            return;
        }
        result = await course.get_detail(theme);
        console.log(result)
        if(!result|| result === false){
            next("500");
            return;
            
        }
        
    } catch (err) {
        next(err);
        return;
        
    }
    res.r(result);
    
    


});


module.exports = router;