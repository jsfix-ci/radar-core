'use strict'
const methods = ['get', 'put', 'post', 'patch', 'delete']
const logger = require('log4js').getLogger()
const generateTreeObject = require('./util').generateTreeObject
const Router = require('koa-router')()
const type = 'router'
const radar = require('./util').root
let rootPath = require('./util').getProjectPath
let routerPath = `${rootPath}/routers`
// 可以把tree做成数组
let routeTree = generateTreeObject(routerPath, type)
require('./util').addToGlobal('route', routeTree)
console.log(radar.controller)
/**
 * anonymous function - description
 *
 * @param  {type} prefix description
 * @param  {type} robj   description
 * @param  {type} router description
 * @return {type}        description
 */
let addToRouter = function (prefix, robj, router) {
  // 提取filter
  let filter = []
  if (robj.filter) {
    filter = robj.filter.map((item) => {
      return getRadarByString('filter', item)
    })
  }
  delete robj.filter
  for (let path in robj) {
    let pst = path.split(' ')
    let method = pst[0]
    if (pst.length === 1) {
      pst[1] = method
      method = 'get'
    }
    if (methods.some(item => method.toLowerCase() === item)) {
      // 去掉第一个'/'再加上'/'可以确保有'/'
      let childpath = pst[1].replace(/^\//, '')
      let route = prefix + '/' + childpath
      let controller
      let pobj = robj[path]
      if (typeof pobj === 'string') {
        controller = getRadarByString('controller', pobj)
      } else if (typeof pobj === 'object') {
        if (pobj.controller && typeof pobj.controller === 'string') {
          controller = getRadarByString('controller', pobj.controller)
        }
        if (pobj.filter && Array.isArray(pobj.filter)) {
          filter = filter.concat(pobj.filter
            .map((item) => {
              return getRadarByString('filter', item)
            })
            .filter((item) => {
              return item !== undefined
            }))
        }
      }
      if (!controller) return
      var args = [route].concat(filter).concat(controller)
      router[method].apply(router, args)
    } else {
      logger.error(`HTTP Method ${method} not support!`)
    }
  }
}

// 扫描简单路由比如，注意，这里只会扫描controller/index.js下的简单路由
/* controller/index.js
'get /wtf': function (ctx, next) {
  ctx.body = 'easy get'
  return next()
}
*/
function applySimpleRoute () {
  function findSimpleController (prefix, controllers) {
    for (var key in controllers) {
      let controller = controllers[key]
      if (Object(controller) === controller) {
        findSimpleController(`${prefix}${key}/`, controller)
      }
      var ctrs = key.split(' ')
      if (ctrs.length > 1) {
        var method = ctrs[0]
        var route = ctrs[1]
        if (route[0] !== '/') {
          route = prefix + ctrs[1]
        }
        console.log('route', route)
        Router[method](route, controller)
      }
    }
  }
  findSimpleController('/', radar.controller)
}

// 通过字符拿到对应函数实现，比如在路由当做只是写了controller的字符串，我们希望能通过该字符串找到对应的函数
function getRadarByString (role, str) {
  var cst = str.split('.').map((item) => {
    return `['${item}']`
  }).join('')
  var exp = `radar.${role}${cst}`
  return new Function('radar', 'return ' + exp)(radar)
}

for (var key in routeTree) {
  addToRouter(key, routeTree[key], Router)
}
applySimpleRoute()

module.exports = function (app) {
  app
    .use(Router.routes())
    .use(Router.allowedMethods())
}
