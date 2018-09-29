const express = require('express');
const router = express.Router();
const planner = require('../../../module/planner/planner');

const plannerAdd = require('./add/add');
const plannerSearch = require('./search/search');
const plannerCancel = require('./cancel/cancel');
const plannerList = require('./list/list');
const plannerImage = require('./image/image');
const plannerArround = require('./arround/arround');

router.use('/add', plannerAdd);
router.use('/search', plannerSearch);
router.use('/cancel',plannerCancel);
router.use('/list',plannerList);
router.use('/image',plannerImage);
router.use('/arround',plannerArround);

/* GET home page. */
router.get('/', async(req, res, next) => {
        let result;

    try {
        let tourIdx = req.query.tour_idx;

        if(!tourIdx || tourIdx==="[]"){
            next("400");
            return;
        }
        result = await planner.get_planner_first(tourIdx);
        if(!result){
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
