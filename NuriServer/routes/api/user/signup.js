const db = require('../../../module/db')
const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');

const jwt = require('../../../module/jwt');

router.post('/', async(req, res, next) => {
	let user_age = req.body.user_age
	let user_birth = req.body.user_birth
	let user_nickname = req.body.user_nickname
	let kakao_idx = req.body.kakao_idx

	let token
	let user_idx

	// if(!user_age)
	// 	user_age = null
	// if(!user_birth)
	// 	user_birth = null	
	// if(!user_nickname)
	// 	user_nickname = null

	//console.log(kakao_idx,user_age, user_birth, user_nickname)
	try {
		if(!kakao_idx){
			next("400")
			return
		}

		let kakao_idxCheckQuery = 
		`
		SELECT EXISTS (SELECT * FROM user WHERE kakao_idx = ?) AS SUCCESS 
		`

		let checkResult = await db.queryParamArr(kakao_idxCheckQuery, kakao_idx)

		if(checkResult[0].SUCCESS){
			next("1400")
			return
		}

	} catch(err) {
		next(err)
		return
	}

	try {
		let insertUserQuery =
		`
		INSERT INTO user (kakao_idx, user_age, user_birth, user_nickname) VALUES(?, ?, ?, ?)
		`

		let insertUserResult = await db.queryParamArr(insertUserQuery,[kakao_idx, user_age, user_birth, user_nickname])

		if(!insertUserResult){
			next("500")
			return
		}

		user_idx = insertUserResult.insertId

	} catch(err) {
		next(err)
		return
	}

	try {

		token = jwt.sign(kakao_idx)
	} catch(err) {
		next(err)
		return
	}

	try {

		let insertTokenQuery =
		`
		UPDATE user SET user_token = ? WHERE user_idx = ?
		`

		let insertTokenResult = await db.queryParamArr(insertTokenQuery, [token, user_idx])

	} catch(err) {
		next(err)
		return
	}

	res.r(token)
})

module.exports = router;