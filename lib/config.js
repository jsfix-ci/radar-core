'use strict'

/**
 * 这里用于全局的环境变量
 * 会去扫描config里env的文件夹下的prd.js,stg.js,dev.js
 * 扫描文件夹的时候使用的是同步方法，因为这只是在启动时做到操作，并不会在序运行是被调用
 * path : rootPath/config/env
 */

const fs = require('fs-extra')
// const logger = require('log4js').getLogger(__dirname)
const isPlainObject = require('./util').isPlainObject
const addToGlobal = require('./util').addToGlobal
const generateTreeObject = require('./util').generateTreeObject
const getDefaultTmplate = require('./util').getDefaultTmplate
const ENV = require('./util').ENV
const type = 'config'

let rootPath = require('./util').getProjectPath

/** ************************环境变量 env**********************************/
const configs = [
  'development.js',
  'staging.js',
  'production.js'
]

let env = {}

// 确保有这三个文件，没有则创建
configs.forEach((config) => {
  let absolutePath = `${rootPath}/config/env/${config}`
  fs.ensureFileSync(absolutePath)
  let conf = require(absolutePath)
  // 如果没有写配置，则把默认配置写进去再去读取
  // 为什么要这么多此一举，是因为把默认配置写进去有一种指导的效果
  if (isPlainObject(conf)) {
    fs.writeFileSync(config, getDefaultTmplate(type))
    delete require.cache[config]
    conf = require(absolutePath)
  }
  env[config.substr(0, config.length - 3)] = conf
})

// 读取env文件夹下的其他自定义环境变量
fs.readdirSync(`${rootPath}/config/env`).filter((item) => {
  return item.substr(-3) === '.js' && configs.every((config) => {
    return config !== item
  })
}).forEach((file) => {
  env[file.substr(0, file.length - 3)] = require(`${rootPath}/config/env/${file}`)
})

/** ******************************配置******************************
 * 这里读取配置时应该忽略env文件夹
 */
let config = generateTreeObject(`${rootPath}/config`, type, ['env', 'index'])
config['env'] = env
Object.assign(config, env[ENV])
addToGlobal('config', config)
module.exports = config
