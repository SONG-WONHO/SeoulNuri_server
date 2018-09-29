const db = require('../db');

module.exports = {
    get_bookmark: async (type, user_idx) => {
        let dbTable = 'bookmark_'+ type;
        let bookmarkIdx =  'bookmark_'+ type+'_idx';
        let typeIdx  = type +'_idx' ;
        let starAverage  = type + '_star';
        let starCount = type + '_star_count';
        let typeTitle = type+ '_name';
        let typeImage = type+'_image';

        let selectQuery = `
        SELECT ${starAverage},${starCount},${typeTitle},${typeImage},${dbTable}.${typeIdx}
        FROM ${dbTable}
        LEFT JOIN ${type}
        ON ${type}.${typeIdx} = ${dbTable}.${typeIdx}
        WHERE user_idx = ?
        `;
        console.log(selectQuery);
        
        return await db.queryParamArr(selectQuery,[user_idx]);
    },
    post_bookmark : async(type, idx, user_idx)=>{
        let dbTable = 'bookmark_'+ type;
        let bookmarkIdx =  'bookmark_'+ type+'_idx';
        let typeIdx  = type +'_idx' ;
        
        let selectQuery = `
        SELECT *
        FROM user
        WHERE user_idx = ? 
        `;
        let selectResult = await db.queryParamArr(selectQuery,[user_idx]);
        
        console.log(selectResult[0]);
        if(selectResult.length >= 1){
            let bookmarkQuery = `SELECT * FROM ${dbTable} WHERE ${typeIdx}=? AND user_idx = ?`
            let bookmakrResult = await db.queryParamArr(bookmarkQuery,[idx,user_idx]);
            console.log(bookmakrResult.length)
            if(bookmakrResult.length>=1){
                
                
                return '1405' ; 
            }
            let insertQuery = `INSERT INTO ${dbTable} (${typeIdx}, user_idx) VALUES (?,?)`;
            let insertResult = await db.queryParamArr(insertQuery,[idx,user_idx])
            if(!insertResult){
                return false;
            }
            let isBookedQuery = `SELECT count(*) AS isBooked FROM ${dbTable} WHERE user_idx = ? AND ${typeIdx}=?`
            let result = await db.queryParamArr(isBookedQuery,[user_idx,idx]);

            console.log(result);
            return result[0];
            
        }else{
            return '1403';
        }
        
    },
    //tour_idx로 각각 가져오기
    get_bookmark_tour_each : async(tour_idx, user_idx)=> {
        let tourBookmarkQuery =
        `
        SELECT *
        FROM bookmark_tour
        WHERE tour_idx = ? AND user_idx = ?
        `

        let tourBookmarkResult = await db.queryParamArr(tourBookmarkQuery, [tour_idx, user_idx])

        
    }



};