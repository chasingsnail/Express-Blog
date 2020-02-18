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
const loginCheck = require('../middleware/loginCheck')

router.get('/list', async (req, res, next) => {
	let author = req.query.author || ''
	const keyword = req.query.keyword || ''
	if (req.query.isadmin === '1') {
		if (req.session.username === null) {
			return res.json(new ErrorModel('未登录'))
		}
		author = req.session.username
	}
	const data = await getList(author, keyword)
	return res.json(new SuccessModel(data))
})

// 博客详情
router.get('/detail', async (req, res, next) => {
	const data = await getDetail(req.query.id)
	return res.json(new SuccessModel(data))
})

// 新增博客
router.post('/new', loginCheck, async (req, res, next) => {
	req.body.author = req.session.username
	const data = await createBlog(req.body)
	return res.json(new SuccessModel(data, '新增成功'))
})

// 更新博客
router.post('/update', loginCheck, async (req, res, next) => {
	const flag = await updateBlog(req.query.id, req.body)
	return flag
		? res.json(new SuccessModel('修改成功'))
		: res.json(new ErrorModel('失败'))
})

// 删除博客
router.post('/del', loginCheck, async (req, res, next) => {
	const flag = await delBlog(req.query.id, req.session.username)
	return flag
		? res.json(new SuccessModel('删除成功'))
		: res.json(new ErrorModel('失败'))
})

module.exports = router
