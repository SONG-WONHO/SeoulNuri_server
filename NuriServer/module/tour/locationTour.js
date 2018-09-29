const db = require('../db')

//module
const distance = require('../distance')

module.exports = {
	get_arround_location_tour : async (tour_idx) => {
		let onLocation = {} // 파라미터의 tour_idx 기준의 위치
		let arroundLocation = [] // tour_idx 기준 주변의 위치

		let getLocationQuery =
		`
		SELECT tour_latitude, tour_longitude
		FROM tour
		WHERE tour_idx = ?
		`

		let getLocationResult = await db.queryParamArr(getLocationQuery, tour_idx)

		if(!getLocationResult){
			return
		}

		onLocation.tour_idx = tour_idx
		onLocation.tour_latitude = getLocationResult[0].tour_latitude
		onLocation.tour_longitude = getLocationResult[0].tour_longitude


		let selectArroundLocationQuery =
		`
		SELECT tour_idx, tour_name, tour_latitude, tour_longitude
		FROM tour
		`

		let selectArroundLocationResult = await db.queryParamNone(selectArroundLocationQuery)

		if(!selectArroundLocationResult){
			return
		}


		for(i = 0 ; i < selectArroundLocationResult.length ; i++){
			if(distance.calculateDistance(onLocation.tour_latitude, onLocation.tour_longitude, 
				selectArroundLocationResult[i].tour_latitude, selectArroundLocationResult[i].tour_longitude) < 5){

				if(selectArroundLocationResult[i].tour_idx != tour_idx)
				arroundLocation.push(selectArroundLocationResult[i])
			}
		}


		return arroundLocation
	}
}