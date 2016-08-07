const fs = require('fs-extra')
const isPlainObject = require('./util').isPlainObject
const getDefaultTmplate = require('./util').getDefaultTmplate
const generateTreeObject = require('./util').generateTreeObject

const type = 'router'
let rootPath = require('./util').getProjectPath
let routerPath = `${rootPath}/routers`
let routeTree = generateTreeObject(routerPath, type)

/**
 * anonymous function - 把树结构拍平，如:
 * { a: { b:'controller.index'}} => {'a/b':'controller.index'}
 * @param  {type} tree description
 * @return {type}      description
 */
// let treeToPath = function (tree) {
//   return 1
// }

// let readRouter = function (dir) {
//   fs.readdirSync(dir)
// }

console.log('router', routeTree)
