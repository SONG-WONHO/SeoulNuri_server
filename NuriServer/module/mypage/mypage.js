const db = require('../db');

module.exports = {
    post_handiType : async(handiType,user_idx) => {
        
        let handiList = Array.from(handiType);
        handiList.splice(0,1);
        handiList.pop();
        let realHandList = new Array;
    
        let handString = handiList.join("");
        realHandList = handString.split(",").map(Number);
        console.log(realHandList);
        
        
        if(realHandList.length === 0){
            console.log("11");            
            return false;
        }
        let deleteQuery = `DELETE FROM handi_type WHERE user_idx = ?`;
        let deleteResult = await db.queryParamArr(deleteQuery,[user_idx]);
        if(!deleteResult){
            console.log("22");
            return false;
        }

        for(let i = 0; i < realHandList.length ; i++){
            let insertQuery =`INSERT INTO handi_type (handi_type, user_idx) VALUES (?,?)`;
            let insertResult = await db.queryParamArr(insertQuery,[realHandList[i],user_idx]);
            if(!insertResult){
                console.log("33");
                return false;
            }
        }
        return;
        
    }




};