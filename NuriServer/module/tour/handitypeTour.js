const db = require('../db');

module.exports = {

	/*
	handi_type : array
	시각: 0
	청각: 1
	지체: 2
	노인: 3
	*/

	get_handitype_reco_tour : async (handi_type) => {
		let types = []
		let reco_tour = [] 

		for(i = 0 ; i < handi_type.length ; i++){
			switch (handi_type[i]) {
				case 0 :
				types[i] = "tour_visual"
				break

				case 1 :
				types[i] = "tour_hearing"
				break

				case 2 :
				types[i] = "tour_physical"
				break

				case 3 :
				types[i] = "tour_older"
				break 
			}
		}

		if(types.length == 0){ // 아무런 관광지가 없음
			// 라우터 단에서 에러처리
		}

		let tours_index = []
		var selectRecoQuery
		// 장애 타입들에 해당하는 관광지의 index들을 tours_index에 저장
		for(i = 0 ; i < types.length; i++){
			selectRecoQuery = 'SELECT tour_idx FROM ' + types[i] 
			var selectResult = await db.queryParamNone(selectRecoQuery)

			for(j = 0 ; j < selectResult.length ; j++){
				tours_index[tours_index.length] = selectResult[j].tour_idx
			}

		}


		while(1){
		// 해당하는 장애 타입에 관련된 관광지 중 램덤으로 4개 뽑음
		let results = []
		for(i = 0 ; i < 4 - reco_tour.length ; i++){
			// Math.random은 현재 시간을 시준으로 seed를 삼는다. 결론 : 암튼 랜덤임
			result = Math.floor(Math.random() * tours_index.length)
			results[i] = tours_index[result]
			tours_index.splice(result,1)
		}


		for(i = 0 ; i < results.length ; i++){
			let selectTourQuery =
			`
			SELECT tour_idx, tour_name, tour_addr, tour_info, tour_card_img, tour_star, tour_star_count
			FROM tour
			WHERE tour_idx = ?
			`
			let selectTourResult = await db.queryParamArr(selectTourQuery, results[i])

			if(selectTourResult[0].tour_card_img!="없음"){
				let obj = {}
				obj.tour_idx = selectTourResult[0].tour_idx
				obj.tour_name = selectTourResult[0].tour_name
				obj.tour_addr = selectTourResult[0].tour_addr
				obj.tour_info = selectTourResult[0].tour_info
				obj.tour_card_image = selectTourResult[0].tour_card_img
				obj.tour_star = selectTourResult[0].tour_star
				obj.tour_star_count = selectTourResult[0].tour_star_count
				reco_tour.push(obj)
			}
		}

		if(reco_tour.length == 4)
			break
	}

		return reco_tour

	}
}