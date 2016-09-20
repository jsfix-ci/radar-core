'use strict'

const addToGlobal = require('./util').addToGlobal
const generateTreeObject = require('./util').generateTreeObject

const type = 'filter'
let rootPath = require('./util').getProjectPath
let filterPath = `${rootPath}/filters`
// 检查有没有routers文件夹，并且有.js文件，如果没有则新建routers文件夹并且在该文件夹里新建index.js文件，并添加默认路径"/"
let filterTree = generateTreeObject(filterPath, type)
addToGlobal('filter', filterTree)
