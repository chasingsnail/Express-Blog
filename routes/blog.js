var express = require('express')
var router = express.Router()
const {
	getList,
	getDetail,
	createBlog,
	updateBlog,
	delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', async (req, res, next) => {
	let author = req.query.author || ''
	const keyword = req.query.keyword || ''
	if (req.query.isadmin === '1') {
		// const loginResult = loginCheck(req)
		if (req.session.username === null) {
			return res.json(new ErrorModel('未登录'))
		}
		author = req.session.username
	}
	const data = await getList(author, keyword)
	return res.json(new SuccessModel(data))
})

router.get('/detail', async (req, res, next) => {
	const data = await getDetail(req.query.id)
	return res.json(new SuccessModel(data))
})

module.exports = router
