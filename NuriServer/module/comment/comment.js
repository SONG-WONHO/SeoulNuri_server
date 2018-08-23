const db = require('../db');

module.exports = {

    /*
    - input: type(관광지, 코스, 숙박), index
    - output: lodge data (multi)
     */
    get_comment: async (type, idx) => {

        let dbName = "comment_" + type;
        let commentTypeIdx = "comment_" + type + "_idx";
        let typeIdx = type + "_idx";

        let checkQuery =
            `
            SELECT * 
            FROM ${type} 
            WHERE ${typeIdx} = ?
            `;

        console.log(checkQuery);

        let checkResult = await db.queryParamArr(checkQuery, [idx]);

        console.log(checkResult);

        if (checkResult.length >= 1) {
            let selectQuery =
                `
                SELECT user_nickname, contents, ${commentTypeIdx}
                FROM ${dbName}
                LEFT JOIN user
                ON ${dbName}.user_idx = user.user_idx
                WHERE ${typeIdx} = ?
                `;

            console.log(selectQuery);

            return await db.queryParamArr(selectQuery, [idx]);
        }
    },

    /*
    - input: type(관광지, 코스, 숙박), index, user_idx, contents
    - output: lodge data (multi)
    */
    post_comment: async (type, idx, user_idx, contents) => {

        let dbName = "comment_" + type;
        let typeIdx = type + "_idx";

        let checkQuery =
            `
            SELECT * 
            FROM ${type} 
            WHERE ${typeIdx} = ?
            `;

        let checkResult = await db.queryParamArr(checkQuery, [idx]);

        if (checkResult.length >= 1) {
            let insertQuery =
                `
                INSERT INTO ${dbName} (user_idx, contents, ${typeIdx})
                VALUES (?, ?, ?)
                `;

            console.log(insertQuery);

            return await db.queryParamArr(insertQuery, [user_idx, contents, idx]);
        }

    }
};