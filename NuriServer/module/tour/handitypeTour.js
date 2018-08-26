const db = require('../db');

module.exports = {

	/*
	handi_type : array
	시각: 1
	청각: 2
	지체: 3
	노인: 4
	*/

	get_handitype_reco_tour : async (handi_type) => {
		let types = []
		console.log(handi_type[0])
		for(i = 0 ; i < handi_type.length ; i++){
			switch (handi_type[i]) {
				case 1 :
				types[i] = "tour_visual"
				break

				case 2 :
				types[i] = "tour_hearing"
				break

				case 3 :
				types[i] = "tour_physical"
				break

				case 4 :
				types[i] = "tour_older"
				break 
			}
		}
		console.log(types)	

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


		// 해당하는 장애 타입에 관련된 관광지 중 램덤으로 4개 뽑음
		let results = []
		for(i = 0 ; i < 4 ; i++){
			// Math.random은 현재 시간을 시준으로 seed를 삼는다. 결론 : 암튼 랜덤임
			result = Math.floor(Math.random() * tours_index.length)
			results[i] = tours_index[result]
			tours_index.splice(result,1)
		}

		return results

	}
}