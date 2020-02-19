var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const fs = require('fs')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express()

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
// log
const fileName = path.join(__dirname, '/logs', 'access.log')
const readStream = fs.createWriteStream(fileName, {
	flags: 'a'
})
if (ENV === 'dev') {
	app.use(logger('dev'))
} else {
	app.use(
		logger('combined', {
			stream: readStream
		})
	)
}

app.use(express.json()) // 获取 json 格式 postData -> req.body
app.use(express.urlencoded({ extended: false })) // 获取非 json 格式 post 数据 -> req.body
app.use(cookieParser()) // parse cookie -> req.cookies
// app.use(express.static(path.join(__dirname, 'public'))); // static files

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
	client: redisClient
})
app.use(
	session({
		secret: 'Ijfds23_',
		cookie: {
			maxAge: 24 * 60 * 60 * 1000
		},
		store: sessionStore
	})
)

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
