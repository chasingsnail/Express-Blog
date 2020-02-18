var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/login', async(req, res, next) => {
	const result = await login(req.body)
	if (result.username) {
		req.session.username = result.username
		req.session.realname = result.realname
		// set(req.sessionId, result.session)
		return res.json(new SuccessModel('登陆成功'))
	}
	return res.json(new ErrorModel('登陆失败'))
})

module.exports = router
