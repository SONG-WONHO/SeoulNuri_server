const db = require('../db');

module.exports = {
    get_search : async (word)=>{
        let selectQuery = `SELECT tour_idx, tour_name
        FROM tour`;
        
        let selectResult = await db.queryParamNone(selectQuery);
        if(!selectResult){
            return false;
        }

        selectResult = selectResult.filter((value)=>{

            if(word === ""){
                
                return true;
            }
            else{
                if(value["tour_name"].indexOf(word) !== -1){
                    
                    return true;
                }
                
                
            }
        });
        if(selectResult.length>1){
            selectResult.sort(function(a,b){
                return a.tour_name < b.tour_name ? -1 : a.tour_name > b.tour_name? 1 : 0;
                
            });
        }
        

        return selectResult;
        
    }

};