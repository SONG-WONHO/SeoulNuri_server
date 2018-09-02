const db = require('../db');

module.exports = {

    get_planner_first : async(idxArray) =>{
        let tourIdxArray = Array.from(idxArray);
        tourIdxArray.splice(0,1);
        tourIdxArray.pop();

        let RealtourIdxArray = tourIdxArray.join("");
        RealtourIdxArray = RealtourIdxArray.split(",").map(Number);
        
        let selectQuery = `
        SELECT 
        tour_name, tour_addr, tour_star, tour_star_count, tour_idx
        FROM tour`;

        let selectResult = await db.queryParamNone(selectQuery);

        if(!selectResult){
            return false;
        }

        /*selectResult = selectResult.filter((value)=>{
            console.log("배열"+RealtourIdxArray);
            console.log(value.tour_idx);
            for(let i = 0; i< RealtourIdxArray.length; i++){
                
                if(RealtourIdxArray[i]=== value.tour_idx){
                    console.log(RealtourIdxArray[i]);
                    
                    return true;
                }
            }
        });
        selectResult.sort();*/

        let result =new Array;

        for(let i = 0; i< RealtourIdxArray.length; i++){
            for(let j = 0; j< selectResult.length; j++){
                if(selectResult[j]["tour_idx"] === RealtourIdxArray[i]){
                    result.push(selectResult[j]);
                }
            }
        }

        



        
        return result;
    }
};