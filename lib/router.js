const logger = require('log4js').getLogger()
const generateTreeObject = require('./util').generateTreeObject
const router = require('koa-router')()

const type = 'router'
let rootPath = require('./util').getProjectPath
let routerPath = `${rootPath}/routers`
let routeTree = generateTreeObject(routerPath, type)

// let readRouter = function (dir) {
//   fs.readdirSync(dir)
// }
const method = ['get', 'put', 'post', 'patch', 'delete']

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
    filter = robj.filter
  }
  for (let path in robj) {
    if (path.indexOf(' ') > -1) {
      let pst = path.split(' ')
      let mh = pst[0]
      if (method.some(item => mh.toLowerCase() === item)) {
        let childpath = pst[1].replace(/^\//, '')
        let router = prefix + '/' + childpath
        let _filter = []
        let _controller
        let pobj = robj[path]
        if (typeof pobj === 'string') {
          _controller = pobj
        } else if (typeof pobj === 'object') {
          if (pobj.controller && typeof pobj.controller === 'string') {
            _controller = pobj.controller
            if (pobj.filter && Array.isArray(pobj.filter)) {
            }
          }
        }
      } else {
        // TODO asd
        logger.error(`HTTP Method ${mh} not support!`)
      }
    } else {
      logger.error(`routerMap ${prefix}/${path} is invalid`)
    }
  }
}
router.get('/', function (ctx, next) {
  ctx.body = 'i am router'
  return next()
})

let applyRouters = function (app) {
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
module.exports = applyRouters
console.log('router', routeTree)
