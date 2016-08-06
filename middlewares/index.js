/**
 * 中间件，会配置比如模板引擎和ODM的地方，或者passport
 */
const beforeMiddlewares = require('./before')
const afterMiddlewares = require('./after')

let applyMiddleware = function (app) {
  let before = [],after = []
  for ( let key in beforeMiddlewares) {
    before.push(beforeMiddlewares[key])
  }
  for ( let key in afterMiddlewares) {
    after.push(afterMiddlewares[key])
  }
  app.use(compose(before))
  app.use(compose(after, {defer: true}))
}

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
