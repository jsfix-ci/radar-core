const koa = require('koa')
const app = new koa()
const logger = require('log4js')
let config = require('./config')
let applyMiddleware = require('../middlewares')
const convert = require('koa-convert')
const co = require('co')

const requestLog = logger.getLogger('request')

app.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    requestLog.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  }).catch(err => {
    requestLog.error('request log:', err)
  })
})

applyMiddleware(app)

app.use((ctx, next) => {
  ctx.body = 'Hello Koa'
  console.log('hello world')
   next()
})

app.listen(2333, function () {
  console.log("it's work")
})

app.on('error', function (err) {
  console.log('errrrrrrrr')
})
