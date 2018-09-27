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
        tour_idx_before = Array.from(tour_idx_before);
        tour_idx_before.splice(0,1);
        tour_idx_before.pop();
        let tourString = tour_idx_before.join('');
        tour_idx_before = tourString.split(',').map(Number);
        console.log(tour_idx_before);

        for(i = 0 ; i < tour_idx_before.length ; i ++){
            tour_idx_after[cnt] = tour_idx_before[i]
            cnt++

        }
        console.log("ss");
        let insertNewPlanQuery =
        `
        INSERT INTO planner_list(user_idx, plan_date)
        VALUES (?, ?)
        `

        let insertNewPlanResult = await db.queryParamArr(insertNewPlanQuery, [user_idx, plan_date])

        if(!insertNewPlanResult){
            console.log("aaa");
            return null
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
                return null
            }
        }

        return plan_idx
    },

    delete_plan : async( user_idx,plan_idx)=>{
        
        //플랜 있는지 확인, 있으면 지우기
        let selectQuery = `SELECT * FROM SEOULNURI.planner_list WHERE plan_idx = ? AND user_idx = ?`;
        let selectResult = await db.queryParamArr(selectQuery,[plan_idx, user_idx]);
        //디텔 있는지 확인, 있으면 지우기
        let selectQuery1 = `SELECT * FROM planner_detail WHERE plan_idx = ?`;
        let selectResult1 = await db.queryParamArr(selectQuery1,[plan_idx]);

        if(!selectResult || !selectResult1 ){
            return false;
        }

        let deleteQuery = `DELETE SEOULNURI.planner_detail, SEOULNURI.planner_list 
        FROM SEOULNURI.planner_detail inner join SEOULNURI.planner_list 
        WHERE planner_detail.plan_idx = planner_list.plan_idx 
        AND planner_detail.plan_idx = ? 
        AND planner_list.user_idx = ?`
        // 디테일, 플랜 지우기

        let deleteResult = await db.queryParamArr(deleteQuery,[plan_idx,user_idx]);

        if(!deleteResult){
            return false;
        }
        return true;
    },
    get_planner_list : async(user_idx)=>{
        
        let selectQuery = `SELECT date_format(plan_date,"%Y") AS date_year, date_format(plan_date,"%c") AS date_month,
        date_format(plan_date,"%d") AS date_day,plan_idx, substring_index( group_concat(tour_name),',',1) AS tour_name
                FROM SEOULNURI.tour
                JOIN(SELECT tour_idx, plan_date,planner_detail.plan_idx
                FROM SEOULNURI.planner_list
                LEFT JOIN SEOULNURI.planner_detail
                ON planner_list.plan_idx = planner_detail.plan_idx
                WHERE user_idx = ?
            ) AS planner
                ON planner.tour_idx = tour.tour_idx
                GROUP BY plan_idx
        `;//유저 인덱스 바꿔야함
        let selectResult = await db.queryParamArr(selectQuery,[user_idx]);

        if(!selectResult){
            return false;
        }

        return selectResult;

        



    }
};