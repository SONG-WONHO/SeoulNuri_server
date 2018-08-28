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
	get_method_tour : async(tour_idx) => {
		let selectMethodQuery =
		`
		SELECT *
		FROM tour
		WHERE tour_idx = ?
		`

		let selectResult = await db.queryParamArr(selectMethodQuery, tour_idx)

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
	get_barrier_free_tour : async(tour_idx) => {
		let result = {}

		// 예외처리 쉽게 하기 위한 초기화
		result.accessibility = {}

		result.common = {}
		result.common.parking = null
		result.common.transportation = null
		result.common.road = null
		result.common.entrance = null
		result.common.toilet = null
		result.common.infodesk = null

		result.physical = {}
		result.physical.wheelchair = null
		result.physical.elevator = null
		result.physical.seat = null

		result.visual = {}
		result.visual.block = null
		result.visual.promotion = null
		result.visual.dog = null
		result.visual.audio = null
		result.visual.guide = null
		result.visual.plate = null

		result.hearing = {}
		result.hearing.signlang = null
		result.hearing.subtitle = null

		result.older = {}
		result.older.wheelchair = null
		result.older.elevator = null

		let selectCommonQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectCommonResult = await db.queryParamArr(selectCommonQuery,tour_idx)

		if(selectCommonResult.length != 0){
			result.common.parking = selectCommonResult[0].parking
			result.common.transportation = selectCommonResult[0].transportation
			result.common.road = selectCommonResult[0].road
			result.common.entrance = selectCommonResult[0].entrance
			result.common.toilet = selectCommonResult[0].toilet
			result.common.infodesk = selectCommonResult[0].infodesk
		}


		let selectPhysicalQuery =
		`
		SELECT *
		FROM tour_physical
		WHERE tour_idx = ?
		`

		let selectPhysicalResult = await db.queryParamArr(selectPhysicalQuery,tour_idx)

		if(selectPhysicalResult.length != 0){
			result.physical.wheelchair = selectPhysicalResult[0].wheelchair
			result.physical.elevator = selectPhysicalResult[0].elevator
			result.physical.seat = selectPhysicalResult[0].seat
		}

		let selectVisualQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectVisualResult = await db.queryParamArr(selectVisualQuery,tour_idx)

		if(selectVisualResult.length != 0){
			result.visual.block = selectVisualResult[0].block
			result.visual.promotion = selectVisualResult[0].promotion
			result.visual.dog = selectVisualResult[0].dog
			result.visual.audio = selectVisualResult[0].audio
			result.visual.guide = selectVisualResult[0].guide
			result.visual.plate = selectVisualResult[0].plate
		}

		let selectHearingQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectHearingResult = await db.queryParamArr(selectHearingQuery,tour_idx)

		if(selectHearingResult.length != 0){
			result.hearing.signlang = selectHearingResult[0].signlang
			result.hearing.subtitle = selectHearingResult[0].subtitle
		}

		let selectOlderQuery =
		`
		SELECT *
		FROM tour_common
		WHERE tour_idx = ?
		`

		let selectOlderResult = await db.queryParamArr(selectOlderQuery,tour_idx)

		if(selectOlderResult.length != 0){
			result.older.wheelchair = selectOlderResult[0].wheelchair
			result.older.elevator = selectOlderResult[0].elevator
		}

		// Accessibility 설정
		let all = 0
		let cnt = 0

		Object.entries(result.visual).forEach(function([key, value]){
			all++
			if(value != null)
				cnt++
		})
		console.log(cnt)
		console.log(all)
		console.log(cnt/all)
		if(cnt/all < 0.33){
			result.accessibility.visual = "하"
		} else if (cnt/all < 0.66){
			result.accessibility.visual = "중"
		} else{
			result.accessibility.visual = "상"
		}

		all = 0
		cnt = 0

		Object.entries(result.hearing).forEach(function([key, value]){
			all++
			if(value != null)
				cnt++
		})

		if(cnt/all < 0.33){
			result.accessibility.hearing = "하"
		} else if (cnt/all < 0.66){
			result.accessibility.hearing = "중"
		} else{
			result.accessibility.hearing = "상"
		}

		all = 0
		cnt = 0

		Object.entries(result.physical).forEach(function([key, value]){
			all++
			if(value != null)
				cnt++
		})

		if(cnt/all < 0.33){
			result.accessibility.physical = "하"
		} else if (cnt/all < 0.66){
			result.accessibility.physical = "중"
		} else{
			result.accessibility.physical = "상"
		}

		all++
		cnt = 0

		Object.entries(result.older).forEach(function([key, value]){
			all++
			if(value != null)
				cnt++
		})

		if(cnt/all < 0.33){
			result.accessibility.older = "하"
		} else if (cnt/all < 0.66){
			result.accessibility.older = "중"
		} else{
			result.accessibility.older = "상"
		}

		return result
	}

}