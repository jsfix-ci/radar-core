const Koa = require('koa')
const app = new Koa()
const logger = require('log4js')
// let config = require('./config')
// let applyMiddleware = require('../middlewares')
// const convert = require('koa-convert')
// const co = require('co')
let applyMiddleware = require('./middleware')

const requestLog = logger.getLogger('request')

app.use((ctx, next) => {
  return next().catch(err => {
    requestLog.error('Oops!:', err)
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
