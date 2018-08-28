const db = require('../db');

module.exports = {

    /*
    - input:
    - output: star, star_count
     */
    get_star: async () => {

        let selectQuery =
            `
            SELECT course_star, course_star_count
            FROM course;
            `;

        let selectResult = await db.queryParamNone(selectQuery);

        let result = {};

        result['visual'] = selectResult[0];
        result['hearing'] = selectResult[1];
        result['physical'] = selectResult[2];
        result['older'] = selectResult[3];

        return result;
    }
};