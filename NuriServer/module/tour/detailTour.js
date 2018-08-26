const db = require('../db')

module.exports = {

	// 관광지 공통(화면 상단)
	get_common_tour : async(tour_idx, user_idx) => {
		let selectCommonQuery =
		`
		SELECT *
		FROM tour
		WHERE tour_idx = ?
		`

		let selectResult = await db.queryParamArr(selectCommonQuery, tour_idx)

		// tour_idx에 해당하는 데이터가 없을 때 예외처리
		let result = {}
		result.tour_idx = null
		result.tour_name = null
		result.tour_star = null
		result.tour_star_count = null
		result.tour_addr = null

		if(selectResult.length != 0){
			result.tour_idx = selectResult[0].tour_idx
			result.tour_name = selectResult[0].tour_name
			result.tour_star = selectResult[0].tour_star
			result.tour_star_count = selectResult[0].tour_star_count
			result.tour_addr = selectResult[0].tour_addr
		}

		let selectBookedQuery = 
		`
		SELECT *
		FROM bookmark_tour
		WHERE user_idx IN (?)
		`

		let selectResult2 = await db.queryParamArr(selectBookedQuery, user_idx)

		if(selectResult2.length == 0)
			result.tour_booked = 0
		else
			result.tour_booked = 1

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
		result.tour_image = null
		result.tour_info_detail = null

		if(selectResult.length != 0){
			result.tour_image = selectResult[0].tour_image
			result.tour_info_detail = selectResult[0].tour_info_detail
		}

		return result
	},
	// 관광지 이용안내 (화면 하단)
	get_usage_tour : async(tour_idx) => {
		let selectUsageQuery =
		`
		SELECT *
		FROM tour
		WHERE tour_idx = ?
		`

		let selectResult = await db.queryParamArr(selectUsageQuery, tour_idx)

		let result = {}
		result.tour_info_use = null
		result.tour_holiday = null
		result.tour_fee = null
		result.tour_parking_space = null
		result.tour_parking_fee = null
		result.tour_info_book = null
		result.tour_service = null
		result.tour_toilet_location = null

		if(selectResult.length != 0){
			result.tour_info_use = selectResult[0].tour_info_use
			result.tour_holiday = selectResult[0].tour_holiday
			result.tour_fee = selectResult[0].tour_fee
			result.tour_parking_space = selectResult[0].tour_parking_space
			result.tour_parking_fee = selectResult[0].tour_parking_fee
			result.tour_info_book = selectResult[0].tour_info_book
			result.tour_service = selectResult[0].tour_service
			result.tour_toilet_location = selectResult[0].tour_toilet_location
		}

		return result
	},

	// 관광지 무장애정보 (화면 하단)
	get_with_tour : async(tour_idx) => {
		let result = {}

		// 예외처리 쉽게 하기 위한 초기화
		result.tour_common = {}
		result.tour_common.parking = null
		result.tour_common.transportation = null
		result.tour_common.road = null
		result.tour_common.entrance = null
		result.tour_common.toilet = null
		result.tour_common.infodesk = null

		result.tour_physical = {}
		result.tour_physical.wheelchair = null
		result.tour_physical.elevator = null
		result.tour_physical.seat = null

		result.tour_visual = {}
		result.tour_visual.block = null
		result.tour_visual.promotion = null
		result.tour_visual.dog = null
		result.tour_visual.audio = null
		result.tour_visual.guide = null
		result.tour_visual.plate = null

		result.tour_hearing = {}
		result.tour_hearing.signlang = null
		result.tour_hearing.subtitle = null

		result.tour_older = {}
		result.tour_older.wheelchair = null
		result.tour_older.elevator = null

		let selectCommonQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectCommonResult = await db.queryParamArr(selectCommonQuery,tour_idx)

		if(selectCommonResult.length != 0){
			result.tour_common.parking = selectCommonResult[0].parking
			result.tour_common.transportation = selectCommonResult[0].transportation
			result.tour_common.road = selectCommonResult[0].road
			result.tour_common.entrance = selectCommonResult[0].entrance
			result.tour_common.toilet = selectCommonResult[0].toilet
			result.tour_common.infodesk = selectCommonResult[0].infodesk
		}


		let selectPhysicalQuery =
		`
		SELECT *
		FROM tour_physical
		WHERE tour_idx = ?
		`

		let selectPhysicalResult = await db.queryParamArr(selectPhysicalQuery,tour_idx)

		if(selectPhysicalResult.length != 0){
			result.tour_physical.wheelchair = selectPhysicalResult[0].wheelchair
			result.tour_physical.elevator = selectPhysicalResult[0].elevator
			result.tour_physical.seat = selectPhysicalResult[0].seat
		}

		let selectVisualQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectVisualResult = await db.queryParamArr(selectVisualQuery,tour_idx)

		if(selectVisualResult.length != 0){
			result.tour_visual.block = selectVisualResult[0].block
			result.tour_visual.promotion = selectVisualResult[0].promotion
			result.tour_visual.dog = selectVisualResult[0].dog
			result.tour_visual.audio = selectVisualResult[0].audio
			result.tour_visual.guide = selectVisualResult[0].guide
			result.tour_visual.plate = selectVisualResult[0].plate
		}

		let selectHearingQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectHearingResult = await db.queryParamArr(selectHearingQuery,tour_idx)

		if(selectHearingResult.length != 0){
			result.tour_hearing.signlang = selectHearingResult[0].signlang
			result.tour_hearing.subtitle = selectHearingResult[0].subtitle
		}

		let selectOlderQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectOlderResult = await db.queryParamArr(selectOlderQuery,tour_idx)

		if(selectOlderResult.length != 0){
			result.tour_older.wheelchair = selectOlderResult[0].wheelchair
			result.tour_older.elevator = selectOlderResult[0].elevator
		}

		console.log(result)

	}

}