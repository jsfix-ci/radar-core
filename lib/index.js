const Koa = require('koa')
const app = new Koa()
const logger = require('log4js')
let config = require('./config')
// let applyMiddleware = require('../middlewares')
// const convert = require('koa-convert')
// const co = require('co')
const requestLog = logger.getLogger('request')
const applyMiddleware = require('./middleware')
require('./filter')
require('./service')
require('./controller')
const applyRouters = require('./router')
// console.log('rhyme', global.rhyme)

app.use((ctx, next) => {
  return next().catch(err => {
    requestLog.error('Oops!:', err)
  })
})

applyMiddleware(app)
applyRouters(app)

// app.use((ctx, next) => {
//   ctx.body = 'Hello Koa'
//   console.log('hello world')
//   next()
// })

app.listen(2333, function () {
  console.log("it's work")
})
