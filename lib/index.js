const koa = require('koa')
const app = new koa()
const logger = require('log4js')
let config = require('./config')

const requestLog = logger.getLogger('request')

app.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    requestLog.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  }).catch(err => {
    console.log('err', err)
  })
})

app.use((ctx, next) => {
  ctx.body = 'Hello Koa'
  throw Error('wtf')
  next()
})

app.listen(3000)
