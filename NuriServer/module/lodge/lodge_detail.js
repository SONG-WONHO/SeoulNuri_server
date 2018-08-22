const db = require('../db');

module.exports = {

    /*
    - input: lodge index
    - output: lodge data (solo)
     */
    get_lodge_detail: async (lodge_idx, user_idx) => {

        let selectLodgeQuery =
            `
            SELECT lodge_idx, lodge_title, lodge_image, lodge_star, lodge_star_count, lodge_addr, lodge_info_detail
            FROM lodge
            WHERE lodge_idx = ?;
            `;

        let selectResult =  await db.queryParamArr(selectLodgeQuery, [lodge_idx]);

        //숙박 즐겨찾기 여부 추가
        let checkBookmarkQuery =
            `
            SELECT * FROM bookmark_lodge
            WHERE user_idx = ? AND lodge_idx = ?
            `;

        let checkResult = await db.queryParamArr(checkBookmarkQuery, [user_idx, lodge_idx]);

        selectResult[0]['lodge_booked'] = (checkResult >= 1) ? 1 : 0;

        return selectResult;
    }
};