const db = require('../db')

module.exports = {
	get_random_tour : async () => {
		let selectRandomQuery = `
		SELECT tour_idx, tour_name, tour_addr, tour_info, tour_card_image, tour_star, tour_star_count
		FROM tour
		ORDER BY RAND() LIMIT 1
		`

		let selectResult = await db.queryParamNone(selectRandomQuery)

		let result = {}

		result.tour_idx = selectResult[0].tour_idx
		result.tour_name = selectResult[0].tour_name
		result.tour_addr = selectResult[0].tour_addr
		result.tour_info = selectResult[0].tour_info
		result.tour_card_image = selectResult[0].tour_card_image
		result.tour_star = selectResult[0].tour_star
		result.tour_star_count = selectResult[0].tour_star_count
		

		return result
	}
}