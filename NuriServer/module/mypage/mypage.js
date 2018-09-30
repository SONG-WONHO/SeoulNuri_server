const db = require('../db');

module.exports = {
    post_handiType : async(handiType,user_idx) => {
        
        // let handiList = Array.from(handiType);
        // handiList.splice(0,1);
        // handiList.pop();
        // let realHandList = new Array;
    
        // let handString = handiList.join("");
        // realHandList = handString.split(",").map(Number);  
        // console.log(realHandList);
        
        
        if(handiType.length === 0){
            console.log("11");            
            return false;
        }
        let deleteQuery = `DELETE FROM handi_type WHERE user_idx = ?`;
        let deleteResult = await db.queryParamArr(deleteQuery,[user_idx]);
        if(!deleteResult){
            console.log("22");
            return false;
        }

        for(let i = 0; i < handiType.length ; i++){
            let insertQuery =`INSERT INTO handi_type (handi_type, user_idx) VALUES (?,?)`;
            let insertResult = await db.queryParamArr(insertQuery,[handiType[i],user_idx]);
            if(!insertResult){
                console.log("33");
                return false;
            }
        }
        return;
        
    },
    get_mypage : async (user_idx)=>{
        let selectQuery = 'SELECT * FROM user WHERE user_idx = ?'
        let selectResult = await db.queryParamArr(selectQuery,[user_idx]);
        if(selectResult.length<1){
            return "1403"
        }else{
            let userQuery = `SELECT group_concat(handi_type SEPARATOR ',') AS handi_type
            FROM SEOULNURI.handi_type WHERE user_idx = ?`
            let userResult = await db.queryParamArr(userQuery,[user_idx]);
            
            selectResult[0]["handi_type"] = userResult[0]["handi_type"];
            return selectResult

        }
    



    }




};