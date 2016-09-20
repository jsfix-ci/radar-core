'use strict'

const logger = require('log4js').getLogger()
const generateTreeObject = require('./util').generateTreeObject
const Router = require('koa-router')()
const type = 'router'
let rootPath = require('./util').getProjectPath
let routerPath = `${rootPath}/routers`
let routeTree = generateTreeObject(routerPath, type)
let radar = require('./util').root

const methods = ['get', 'put', 'post', 'patch', 'delete']

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
      return radar.filter[item]
    })
  }
  delete robj.filter
  for (let path in robj) {
    if (path.indexOf(' ') > -1) {
      let pst = path.split(' ')
      let method = pst[0]
      if (methods.some(item => method.toLowerCase() === item)) {
        // 去掉第一个'/'
        let childpath = pst[1].replace(/^\//, '')
        let route = prefix + '/' + childpath
        let _filter = []
        let _controller
        let pobj = robj[path]
        if (typeof pobj === 'string') {
          _controller = radar.controller[pobj]
        } else if (typeof pobj === 'object') {
          if (pobj.controller && typeof pobj.controller === 'string') {
            _controller = radar.controller[pobj.controller]
          }
          if (pobj.filter && Array.isArray(pobj.filter)) {
            // TODO filter
            console.log(filter)
            _filter = filter.concat(pobj.filter
              .map((item) => {
                return radar.filter[item]
              })
              .filter((item) => {
                return item !== undefined
              }))
          }
        }
        console.log('11111111111111111')
        // console.log(_controller)
        // console.log(_filter)
        if (!_controller) return
        var args = [route].concat(_filter).concat(_controller)
        router[method].apply(router, args)
      } else {
        // TODO asd
        logger.error(`HTTP Method ${method} not support!`)
      }
    } else {
      logger.error(`routerMap ${prefix}/${path} is invalid`)
    }
  }
}

// Router.get('/', function (ctx, next) {
//   ctx.body = 'i am router'
//   return next()
// })

for (var key in routeTree) {
  addToRouter(key, routeTree[key], Router)
}

let applyRouters = function (app) {
  app
    .use(Router.routes())
    .use(Router.allowedMethods())
}
module.exports = applyRouters
console.log('router', routeTree)
