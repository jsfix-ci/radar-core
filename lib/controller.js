const addToGlobal = require('./util').addToGlobal
const generateTreeObject = require('./util').generateTreeObject

const type = 'controller'
let rootPath = require('./util').getProjectPath
let controllerPath = `${rootPath}/controllers`
let controllerTree = generateTreeObject(controllerPath, type)
addToGlobal('controller', controllerTree)
