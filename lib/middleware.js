'use strict'

const fs = require('fs-extra')
const isPlainObject = require('./util').isPlainObject
const getDefaultTmplate = require('./util').getDefaultTmplate

const type = 'middleware'
let rootPath = require('./util').getProjectPath
// 获取中间件，如果不存在则建立

const configs = [
  `${rootPath}/middlewares/before.js`,
  `${rootPath}/middlewares/after.js`
]

let middlewares = configs.map((config, index) => {
  fs.ensureFileSync(config)
  let conf = require(config)
  // 如果没有写配置，则把默认配置写进去再去读取
  // 为什么要这么多此一举，是因为把默认配置写进去有一种指导的效果
  if (isPlainObject(conf)) {
    fs.writeFileSync(config, getDefaultTmplate(`${type}.${index}`))
    delete require.cache[config]
    return require(config)
  }
  return conf
})

let applyMiddleware = function (app) {
  let before = []
  let after = []
  let beforeMiddlewares = middlewares[0]
  let afterMiddlewares = middlewares[1]
  for (var key in beforeMiddlewares) {
    before.push(beforeMiddlewares[key])
  }
  for (let key in afterMiddlewares) {
    after.push(afterMiddlewares[key])
  }
  app.use(compose(before))
  app.use(compose(after, {defer: true}))
}
/**
 * compose - 让koa的中间件自动执行。原理来自于koa-compose，但做了些修改，新增可以改变执行顺序的属性
 *
 * @param  {type} middleware 中间件数组
 * @param  {type} opt        description
 * @return {type}            description
 */
function compose (middleware, opt) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  return function (ctx, next) {
    // 如果一个中间件包含两个next(),则需要报错提醒
    let index = -1
    if (opt && opt.defer) {
      return next().then(() => {
        return dispatch(0, true)
      })
    } else {
      return dispatch(0)
    }
    function dispatch (i, defer) {
      if (i <= index) {
        throw new Error('next() called mutiple times')
      }
      index = i
      const fn = middleware[i]
      if (!fn) {
        if (defer) return
        return next()
      } else {
        try {
          return Promise.resolve(fn(ctx, function () {
            return dispatch(i + 1, defer)
          }))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
}

module.exports = applyMiddleware
