const db = require('../db');

/*
마감에 시달리면서 코딩하니까 코드가 매우 더러워져서 자괴감들고 괴로워
*/

async function DEFAULT(handi_type) {
	let tour_idxs = []
	let result
	console.log(handi_type)
	for (i = 0 ; i < handi_type.length ; i++){
		switch (handi_type[i]) {
				case 1 : // tour_visual
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_visual
				`
				// filter에 해당하는 item들이 있으면 반환, 없으면 빈값 반환
				result = await db.queryParamArr(selectFilterQuery)

				if(!result){
					return
				}

				for(k = 0 ; k < result.length ; k++){
					tour_idxs.push(result[k].tour_idx)
				}
				break

				case 2 : // tour_hearing
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_hearing
				`
				result = await db.queryParamArr(selectFilterQuery)

				if(!result){
					return
				}

				for(k = 0 ; k < result.length ; k++){
					tour_idxs.push(result[k].tour_idx)
				}
				break

				case 3 : // tour_physical
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_physical
				`
				result = await db.queryParamArr(selectFilterQuery)

				if(!result){
					return
				}

				for(k = 0 ; k < result.length ; k++){
					tour_idxs.push(result[k].tour_idx)
				}
				break

				case 4 : // tour_older
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_older
				`
				result = await db.queryParamArr(selectFilterQuery)

				if(!result){
					return
				}

				for(k = 0 ; k < result.length ; k++){
					tour_idxs.push(result[k].tour_idx)
				}
				break 
			}
	}

		return tour_idxs.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;}, []) // 중복 제거
}
module.exports = {

	/*
	handi_type : array
	시각: 0
	청각: 1
	지체: 2
	노인: 3

	filter : array
	시각 -> 점자블록 : a0, 정자홍보물 : a1, 보조견 동반 : a2, 오디오가이드 : a3, 안내요원 : a4, 전자표지판 : a5
	청각 -> 수화안내 : b0, 자막비디오가이드 : b1
	지체 -> 휠체어 : c0, 엘리베이터 : c1
	노인 -> 휠체어 : d0, 엘리베이터 : d1
	DEFAULT : 99
	*/


	//************전체 일 때 처리?
	get_filter_tour : async (handi_type, filter,user_idx) => {
		let data = [] // 리턴 값
		let types = []
		//console.log(handi_type[0])
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

		// default일 경우, 관광지 모두 반환
		if(handi_type.indexOf(9) != -1){
			let selectDefaultQuery =
			`
			SELECT tour_idx, tour_name, tour_card_img, tour_star, tour_star_count
			FROM tour
			`
			let selectBookedQuery = `SELECT count(*) AS tour_booked
		FROM bookmark_tour 
		WHERE user_idx = ? AND tour_idx = ?`;

			let selectDefaultResult = await db.queryParamNone(selectDefaultQuery)


			for(i = 0 ; i < selectDefaultResult.length; i++){
				let selectBookedResult = await db.queryParamArr(selectBookedQuery,[user_idx,selectDefaultResult[i].tour_idx]);
				//console.log(selectBookedResult[0]);
				data[i] = {}
				data[i].tour_idx = selectDefaultResult[i].tour_idx
				data[i].tour_name = selectDefaultResult[i].tour_name
				data[i].tour_card_img = selectDefaultResult[i].tour_card_img
				data[i].tour_star = selectDefaultResult[i].tour_star
				data[i].tour_star_count = selectDefaultResult[i].tour_star_count 
				data[i].tour_booked = selectBookedResult[0].tour_booked
			}

			return data
		}
		//console.log(types)	

		if(types.length == 0){ // 아무런 관광지가 없음
			// 라우터 단에서 에러처리
		}

		let tours_index = []
		var selectRecoIdxQuery1 = [] 
		let selectRecoIdxQuery2 = ""
		//console.log(types)
		// 장애 타입들에 해당하는 관광지의 index들을 tours_index에 저장
		for(i = 0, j = 0 ; i < types.length * 2, j < types.length - 1; i+=2, j++){
			selectRecoIdxQuery1[i] =' INNER JOIN ' + types[j+1]
			selectRecoIdxQuery1[i+1] = 'ON ' + types[j] + '.tour_idx = ' + types[j+1] + '.tour_idx'
		}
		selectRecoIdxQuery1.splice(0,0,'SELECT ' + types[0] + '.tour_idx' + ' FROM ' + types[0] + ' ')

		//selectRecoQuery1.splice(types.length*2 - 1, 1)

		for(i = 0 ; i < selectRecoIdxQuery1.length ; i++)
			selectRecoIdxQuery2 += selectRecoIdxQuery1[i] + ' '

		//console.log(selectRecoIdxQuery2)

		// 필터에 맞는 관광지 index들 값
		let selectIdxResult = await db.queryParamNone(selectRecoIdxQuery2)

		// 아무 값도 없을 때
		if(!selectIdxResult)
			return null

		//console.log(selectIdxResult)


		let visual = []
		let hearing = []
		let physical = []
		let older = []

		let DEFAULT_tour_idx = [] // 이게 null(length가 0)이면 default가 아니다. 아니면 default임

		// 세부필터의 시각, 청각, 지체, 노인에 따른 분류
		for(i = 0 ; i < filter.length ; i++){
			switch(filter[i]){
				case 0 :
				visual.push("block")
				break

				case 1 :
				visual.push("promotion")
				break

				case 2 :
				visual.push("dog")
				break

				case 3 :
				visual.push("audio")
				break

				case 4 :
				visual.push("guide")
				break

				case 5 :
				visual.push("plate")
				break

				case 10 :
				hearing.push("signlang")
				break

				case 11 :
				hearing.push("subtitle")
				break

				case 20 :
				physical.push("wheelchair")
				break

				case 21 :
				physical.push("elevator")
				break

				case 22 :
				physical.push("seat")
				break

				case 30 :
				older.push("wheelchair")
				break

				case 31 :
				older.push("elevator")
				break

				case 99 : //DEFAULT
				DEFAULT_tour_idx = await DEFAULT(handi_type)
				break

			}
		}


		let selectFilterQuery = ""

		/*
		1. 위에서 구한 handi_type들의 교집합에 대한 index를 저장하는 selectIdxResult를 순회
		2. handi_type을 순회하면서 filter에 있는 값들을 분류한(visual, hearing, physical, older) item들이 있는지 확인
		3. 없으면 해당 index(selectIdxResult) 삭제
		4. 결국 남은 index들이 조건들을 만족하는 관광지이다.
		*/
		for(x = 0 ; x < selectIdxResult.length ; x++){
			let isExist = 1 // 필터에 해당 하는 조건을 모두 만약해야 1 하나라도 만족하지 않으면 0
			let check
		for(i = 0 ; i < handi_type.length ; i++){
			switch (handi_type[i]) {
				case 0 : // tour_visual
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_visual
				WHERE tour_idx = ?
				`
				// filter들의 item들을 확인하기 위해 query 만듬
				for(j = 0 ; j < visual.length ; j++){
					selectFilterQuery += ' AND ' + visual[j] + '!= "없음"'
				}


				// filter에 해당하는 item들이 있으면 반환, 없으면 빈값 반환
				check = await db.queryParamArr(selectFilterQuery, selectIdxResult[x].tour_idx)
				if(check.length == 0){
					isExist = 0
					break
				}

				break

				case 1 : // tour_hearing
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_hearing
				WHERE tour_idx = ?
				`
				for(j = 0 ; j < hearing.length ; j++){
					selectFilterQuery += ' AND ' + hearing[j] + '!= "없음"'
				}
				check = await db.queryParamArr(selectFilterQuery, selectIdxResult[x].tour_idx)
				if(check.length == 0){
					isExist = 0
					break
				}
				break

				case 2 : // tour_physical
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_physical
				WHERE tour_idx = ?
				`
				for(j = 0 ; j < physical.length ; j++){
					selectFilterQuery += ' AND ' + physical[j] + '!= "없음"'
				}
				check = await db.queryParamArr(selectFilterQuery, selectIdxResult[x].tour_idx)
				if(check.length == 0){
					isExist = 0
					break
				}

				break

				case 3 : // tour_older
				selectFilterQuery = 
				`
				SELECT tour_idx
				FROM tour_older
				WHERE tour_idx = ?
				`
				for(j = 0 ; j < older.length ; j++){
					selectFilterQuery += ' AND ' + older[j] + '!= "없음"'
				}
				check = await db.queryParamArr(selectFilterQuery, selectIdxResult[x].tour_idx)

				if(check.length == 0){
					isExist = 0
					break
				}

				break 
			}
		}

		if(!isExist){
			delete selectIdxResult[x] // 삭제(undefined)
		}
	}


	// undefined 요소 삭제
	for(i = 0 ; i < selectIdxResult.length ; ){
		if(selectIdxResult[i] == undefined){
			selectIdxResult.splice(i,1)
		} else{
			i++
		}	

	}



		let selectRecoQuery = `
		SELECT tour_idx, tour_name, tour_card_img, tour_star, tour_star_count 
		FROM tour 
		WHERE tour_idx = ?
		`
		let selectBookedQuery = `SELECT count(*) AS tour_booked
		FROM bookmark_tour 
		WHERE user_idx = ? AND tour_idx = ?`;

		if(DEFAULT_tour_idx.length != 0){ // default일 경우
			for(i = 0 ; i < DEFAULT_tour_idx.length ; i++){
				let selectResult = await db.queryParamArr(selectRecoQuery, DEFAULT_tour_idx[i])
				//let selectBookedResult = await db.queryParamArr(selectBookedQuery,[user_idx,]);
				data[i] = {}
				data[i].tour_idx = selectResult[0].tour_idx
				data[i].tour_name = selectResult[0].tour_name
				data[i].tour_card_img = selectResult[0].tour_card_img
				data[i].tour_star = selectResult[0].tour_star
				data[i].tour_star_count = selectResult[0].tour_star_count
			}
		} else {
			for(i = 0 ; selectIdxResult[i] != undefined && i < selectIdxResult.length ; i++){
				let selectResult = await db.queryParamArr(selectRecoQuery, selectIdxResult[i].tour_idx)
			
				//let selectBookedResult = await db.queryParamArr(selectBookedQuery,[user_idx,]);
				data[i] = {}
				data[i].tour_idx = selectResult[0].tour_idx
				data[i].tour_name = selectResult[0].tour_name
				data[i].tour_card_img = selectResult[0].tour_card_img
				data[i].tour_star = selectResult[0].tour_star
				data[i].tour_star_count = selectResult[0].tour_star_count
			}
		}
		//console.log(data)

		selectBookedQuery = `SELECT count(*) AS tour_booked
		FROM bookmark_tour 
		WHERE user_idx = ? AND tour_idx = ?`;

		for(i = 0 ; i < data.length ; i ++){
			selectBookedResult = await db.queryParamArr(selectBookedQuery,[user_idx,data[i].tour_idx])
			data[i].tour_booked = selectBookedResult[0].tour_booked
		}
		return data
	}
}