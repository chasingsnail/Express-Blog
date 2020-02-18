const crypto = require('crypto')

// 密匙
const SECRECT_KEY = 'ADewnf_34*'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 生成密码
function genPassword(pwd) {
  let str = `password=${pwd}&key=${SECRECT_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}