const db = require('../db');

module.exports = {

	/*
	handi_type : array
	시각: 1
	청각: 2
	지체: 3
	노인: 4
	*/

	get_filter_tour : async (handi_type) => {
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
		var selectRecoIdxQuery1 = []
		let selectRecoIdxQuery2 = ""
		console.log(types)
		// 장애 타입들에 해당하는 관광지의 index들을 tours_index에 저장
		for(i = 0, j = 0 ; i < types.length * 2, j < types.length - 1; i+=2, j++){
			selectRecoIdxQuery1[i] = 'FROM ' + types[j] + ' INNER JOIN ' + types[j+1]
			selectRecoIdxQuery1[i+1] = 'ON ' + types[j] + '.tour_idx = ' + types[j+1] + '.tour_idx'
		}
		selectRecoIdxQuery1.splice(0,0,'SELECT ' + types[0] + '.tour_idx')

		//selectRecoQuery1.splice(types.length*2 - 1, 1)

		for(i = 0 ; i < selectRecoIdxQuery1.length ; i++)
			selectRecoIdxQuery2 += selectRecoIdxQuery1[i] + ' '


		// 필터에 맞는 관광지 index들 값
		let selectIdxResult = await db.queryParamNone(selectRecoIdxQuery2)

		console.log(selectIdxResult)
		let selectRecoQuery = `
		SELECT tour_idx, tour_name, tour_image, tour_star, tour_star_count 
		FROM tour 
		WHERE tour_idx = ?
		`

		
		let data = []
		for(i = 0 ; i < selectIdxResult.length ; i++){
			let selectResult = await db.queryParamArr(selectRecoQuery, selectIdxResult[i].tour_idx)
			data[i] = {}
			data[i].tour_idx = selectResult[0].tour_idx
			data[i].tour_name = selectResult[0].tour_name
			data[i].tour_image = selectResult[0].tour_image
			data[i].tour_star = selectResult[0].tour_star
			data[i].tour_star_count = selectResult[0].tour_star_count
		}

		return data
	}
}