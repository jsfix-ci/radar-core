'use strict'

const addToGlobal = require('./util').addToGlobal
const generateTreeObject = require('./util').generateTreeObject

const type = 'service'
let rootPath = require('./util').getProjectPath
let servicePath = `${rootPath}/services`
let serviceTree = generateTreeObject(servicePath, type)
addToGlobal('service', serviceTree)
