const db = require('../db')

module.exports = {
	get_random_tour : async () => {
		let selectRandomQuery = `
		SELECT tour_idx, tour_name, tour_addr, tour_info, tour_card_img, tour_star, tour_star_count
		FROM tour
		ORDER BY RAND() LIMIT 1
		`

		let selectResult = await db.queryParamNone(selectRandomQuery)

		if(selectResult[0].tour_card_img!="없음"){ // 이미지 있을 때만
			let result = {}
			result.tour_idx = selectResult[0].tour_idx
			result.tour_name = selectResult[0].tour_name
			result.tour_addr = selectResult[0].tour_addr
			result.tour_info = selectResult[0].tour_info
			result.tour_card_img = selectResult[0].tour_card_img
			result.tour_star = selectResult[0].tour_star
			result.tour_star_count = selectResult[0].tour_star_count
		}

		return result
	}
}