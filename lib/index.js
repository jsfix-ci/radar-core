'use strict'

const Koa = require('koa')
const app = new Koa()
const logger = require('log4js')
const requestLog = logger.getLogger('request')

function start (opt = {}, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  /** ******加载配置****** **/
  let config = require('./config')
  Object.assign(config, opt)
  /** ******加载过滤器****** **/
  require('./filter')
  /** ******加载服务****** **/
  require('./service')
  /** ******加载控制器****** **/
  require('./controller')
  /** ******全局拦截错误****** **/
  app.use((ctx, next) => {
    return next().catch(err => {
      requestLog.error('Oops!:', err)
    })
  })
  /** ******应用中间件****** **/
  require('./middleware')(app)
  /** ******应用路由****** **/
  require('./router')(app)

  app.listen(config.port, '0.0.0.0', (err) => {
    if (err) return cb && cb(err)
    cb && cb()
  })
}
app.start = start
module.exports = app
