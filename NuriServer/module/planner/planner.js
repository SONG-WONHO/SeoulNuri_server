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
    },


    add_plan : async(user_idx, plan_date, tour_idx_before) => {
        let plan_idx
        let tour_idx_after = []
        let cnt = 0

        for(i = 1 ; i < tour_idx_before.length ; i += 2){
            tour_idx_after[cnt] = tour_idx_before[i]
            cnt++
        }

        let insertNewPlanQuery =
        `
        INSERT INTO planner_list(user_idx, plan_date)
        VALUE (?, ?)
        `

        let insertNewPlanResult = await db.queryParamArr(insertNewPlanQuery, [user_idx, plan_date])

        if(!insertNewPlanResult){
            return false
        }
        // 방금 넣은 plan의 index
        plan_idx = insertNewPlanResult.insertId

        let insertNewPlanTourQuery =
        `
        INSERT INTO planner_detail(plan_idx, tour_idx)
        VALUE (?, ?)
        `

        for(i = 0 ; i < tour_idx_after.length ; i++){
            let insertNewPlanTourResult = await db.queryParamArr(insertNewPlanTourQuery, [plan_idx, tour_idx_after[i]])
            if(!insertNewPlanTourResult){
                return false
            }
        }

        return plan_idx
    }
};