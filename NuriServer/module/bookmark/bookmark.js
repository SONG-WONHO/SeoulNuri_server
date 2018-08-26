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
        FROM ${dbTable}
        WHERE user_idx = ? 
        `;
        let selectResult = await db.queryParamArr(selectQuery,[user_idx]);
        if(selectResult.length >= 1){
            let insertQuery = `INSERT INTO ${dbTable} (${typeIdx}, user_idx) VALUES (?,?)`;

            return await db.queryParamArr(insertQuery,[idx,user_idx]);
            
        }
        
    }



};