const db = require('../db');

module.exports = {
    post_handiType : async(handiType,user_idx) => {
        
        let handiList = Array.from(handiType);
        handiList.splice(0,1);
        handiList.pop();
        let realHandList;
        let handString = handiList.join("");
        realhandList = handString.split(",").map(Number);
        
        
        console.log(realhandList);
        
        if(handiList.length === 0){            
            return false;
        }
        let deleteQuery = `DELETE FROM handi_type WHERE user_idx = ?`;
        let deleteResult = await db.queryParamArr(deleteQuery,[user_idx]);
        if(!deleteResult){
            return false;
        }

        for(let i = 0; i < handiList.length ; i++){
            let insertQuery =`INSERT INTO handi_type (handi_type, user_idx) VALUES (?,?)`;
            let insertResult = await db.queryParamArr(insertQuery,[handiList[i],user_idx]);
            if(!insertResult){
                return false;
            }
        }
        return;
        
    }




};