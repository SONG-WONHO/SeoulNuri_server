const db = require('../db');

module.exports = {

    /*
    - input:
    - output: lodge data (multi)
     */
    get_lodge: async () => {

        let selectLodgeQuery =
            `
            SELECT lodge_idx, lodge_title, lodge_image, lodge_star, lodge_star_count
            FROM lodge;
            `;

        return await db.queryParamNone(selectLodgeQuery);

  }
};