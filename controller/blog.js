const { exec } = require('../db/mysql')

// 博客列表
const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `
	if (author) {
		sql += `and author='${author}' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += 'order by createTime desc'
	return exec(sql)
}

// 博客详情
const getDetail = async id => {
	const sql = `select * from blogs where id=${id}`
	const res = await exec(sql)
	return res[0]
}

// 新增博客
const createBlog = async blogData => {
	const { title, content, author } = blogData
	const createTime = Date.now()
	const sql = `insert into blogs(title, content, createtime, author) values('${title}', '${content}', ${createTime}, '${author}')`
	const res = await exec(sql)
	return {
		id: res.insertId
	}
}

// 更新博客
const updateBlog = async (id, blogData) => {
	const { title, content } = blogData
	const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
	const res = await exec(sql)
	return res.affectedRows > 0
}

// 删除博客
const delBlog = async (id, author) => {
	console.log('id, author', id, author)
	const sql = `delete from blogs where id=${id}`
	const res = await exec(sql)
	return res.affectedRows > 0
}

module.exports = {
	getList,
	getDetail,
	createBlog,
	updateBlog,
	delBlog
}
