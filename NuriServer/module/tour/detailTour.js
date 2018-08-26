const db = require('../db')

module.exports = {

	// 관광지 (화면 상단)
	get_common_tour : async(tour_idx) => {
		let selectCommonQuery =
		`
		SELECT *
		FROM tour
		WHERE tour_idx = ?
		`

		let selectResult = await db.queryParamArr(selectCommonQuery, tour_idx)

		// tour_idx에 해당하는 데이터가 없을 때 예외처리

		let result = {}

		result.tour_idx = selectResult[0].tour_idx
		result.tour_name = selectResult[0].tour_name
		result.tour_star = selectResult[0].tour_star
		result.tour_star_count = selectResult[0].tour_star_count
		result.tour_addr = selectResult[0].tour_addr

		let selectBookedQuery = 
		`
		SELECT count(*) as cnt
		FROM bookmark_course 
		WHERE tour_idx = ?
		`

		let selectResult2 = await db.queryParamArr(selectBookedQuery, tour_idx)

		// tour_idx에 해당하는 데이터가 없을 때 예외처리 통일시키기
		if(selectResult2)
			result.tour_booked = selectResult2[0].cnt
		else
			result.tour_booked = 0

		return result
	},

	// 관광지 소개 (화면 하단)
	get_intro_tour : async(tour_idx) => {
		let selectIntroQuery =
		`
		SELECT tour_image, tour_info_detail
		FROM tour
		WHERE tour_idx = ?
		`

		let selectResult = await db.queryParamArr(selectIntroQuery, tour_idx)

		let result = {}

		result.tour_image = selectResult[0].tour_image
		result.tour_info_detail = selectResult[0].tour_info_detail

		console.log(result)
	}

}