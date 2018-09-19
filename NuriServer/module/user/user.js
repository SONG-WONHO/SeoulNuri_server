const db = require('../db')
const jwt = require('../jwt')
module.exports = {

	user_Verify : async (token) => {
		let decoded = jwt.verify(token)
		let user = {} // user_idx와 handi_type 저장
		let user_idx
		let handi_type = []

		if (decoded == -1){
			return -1
		}

		let kakao_idx = decoded.kakao_idx

		let getUserInfoQuery =
		`
		SELECT *
		FROM user
		WHERE kakao_idx = ?
		`

		let infoResult = await db.queryParamArr(getUserInfoQuery, kakao_idx)
		user_idx = infoResult[0].user_idx

		if(!infoResult){
			return -1
		}


		let getUserHandiTypeQuery =
		`
		SELECT *
		FROM handi_type
		WHERE user_idx = ?
		`

		let handiTypeResult = await db.queryParamArr(getUserHandiTypeQuery, 1)

		if(!handiTypeResult){
			return -1
		}
		for(i = 0 ; i < handiTypeResult.length ; i++){
			handi_type[i] = handiTypeResult[i].handi_type
		}

		user.user_idx = user_idx
		user.handi_type = handi_type

		return user
	}
}