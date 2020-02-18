const env = process.env.NODE_ENV

const MYSQL_CONF_DEV = {
	host: 'localhost',
	user: 'root',
	password: 'Azure2576',
	port: '3306',
	database: 'myblog'
}

const MYSQL_CONF_PRD = {
	host: 'localhost',
	user: 'root',
	password: 'Azure2576',
	port: '3306',
	database: 'myblog'
}

const envConfMap = {
  dev: MYSQL_CONF_DEV,
  production: MYSQL_CONF_PRD
}

const MYSQL_CONF = envConfMap[env]
const REDIS_CONF = {
	port: 6379,
	host: '127.0.0.1'
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF
}
