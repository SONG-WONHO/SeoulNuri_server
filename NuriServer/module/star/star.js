const db = require('../db');


module.exports = {
    
    post_star : async (type,idx,user_idx,star) =>{//타입, 인덱스, 유저인덱스, 별점
        let typeIdx = type + "_idx";
        let typeStarPerson = type+"_star"+"_count";
        let typeStarAvg = type+"_star";
        let typeStarTable = type + "_star";
        

        //별점 있는 지 확인 -> 없으면 등록 있으면 수정
        let checkQuery = `SELECT * FROM ${typeStarTable} WHERE user_idx = ? AND ${typeIdx} = ?`;
        let checkResult = await db.queryParamArr(checkQuery,[user_idx,idx]);
        console.log(checkResult);
        if(checkResult.length >= 1){
            console.log("라라라");
            let updateQuery = `UPDATE ${typeStarTable} SET star = ? WHERE user_idx = ? AND ${typeIdx} = ?`;
            let updateResult = await db.queryParamArr(updateQuery,[star,user_idx,idx]);
            if(!updateResult){
                return false;
            }
            // 별점 평균, 별점 참여자 수 업데이트
            let starSelectQuery = `SELECT count(*) AS starPerson, AVG(star) AS starAvg
            FROM ${typeStarTable}
            WHERE  ${typeIdx} = ?`;
            let starSelectResult = await db.queryParamArr(starSelectQuery,idx);
            if(!starSelectResult){
                return false;
            }
            let starUpdateQuery = `UPDATE ${type} SET ${typeStarAvg} = ?, ${typeStarPerson}=?  WHERE ${typeIdx} = ?`;
            return await db.queryParamArr(starUpdateQuery,[starSelectResult[0]["starAvg"],starSelectResult[0]["starPerson"],idx]);




        }
        else{
            console.log("드러왔뇨");
            let insertQuery = `INSERT INTO ${typeStarTable} (${typeIdx},user_idx, star) VALUES(?,?,?)`;
            let insertResult = await db.queryParamArr(insertQuery,[idx,user_idx,star]);
            if(!insertResult){
                console.log("인서트 X");
                return false;
            }
            // 별점 평균, 별점 참여자 수 업데이트
            let starSelectQuery = `SELECT count(*) AS starPerson, AVG(star) AS starAvg
            FROM ${typeStarTable}
            WHERE  ${typeIdx} = ?`;
            let starSelectResult = await db.queryParamArr(starSelectQuery,idx);
            if(!starSelectResult){
                console.log("셀렉 X");
                return false;
            }
            let starUpdateQuery = `UPDATE ${type} SET ${typeStarAvg} = ?, ${typeStarPerson}=?  WHERE ${typeIdx} = ?`;
            return await db.queryParamArr(starUpdateQuery,[starSelectResult[0]["starAvg"],starSelectResult[0]["starPerson"],idx]);
        }
    }
};

