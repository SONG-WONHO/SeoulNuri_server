const db = require('../db');

module.exports={
    get_detail : async(theme) =>{
        let scheduleArray = new Array;
        let tourArray = new Array;
        let selectQuery = `SELECT * FROM course WHERE course_theme = ?`;
        let selectResult = await db.queryParamArr(selectQuery,[theme]);
        if(!selectResult){
            return false;
        }
        let scheduleString = selectResult[0]["course_schedule"];
        scheduleArray= scheduleString.split(',').map(Number);
        //selectResult[0]["course_schedule"] = scheduleArray;
        console.log(scheduleArray);
        for(let i = 0; i < scheduleArray.length; i++){
            let tourQuery = `SELECT * FROM tour WHERE tour_idx = ?`;
            let tourResult = await db.queryParamArr(tourQuery,[scheduleArray[i]]);
            if(!tourResult){
                return false;
            }
            tourArray.push(tourResult[0]);
        }
        selectResult[0]["course_schedule"] = tourArray;

        //console.log(selectResult[0]);
        
        return selectResult[0];


        



    }


};