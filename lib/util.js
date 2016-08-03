const fs = require('fs-extra')
const path = require('path')
const globalName = 'rhyme'
global[globalName] = {}

let isPlainObject = function isPlainObject (obj) {
  return Object.keys(obj).length === 0
}

let addToGlobal = function addToGlobal (property, obj) {
  Object.assign(global[globalName][property] || {}, obj)
}

let ENV = process.env.NODE_ENV || 'development'

let getProjectPath = function () {
  let rootPath = process.cwd()
  if (ENV === 'radar_unit_test') {
    rootPath = `${rootPath}/test/fixture`
  }
  return rootPath
}()
/**
 * generateTreeObject - description
 *
 * @param  {type} dir    absolute path
 * @param  {type} ignore ignore path, Array
 * @return {type}        description
 */
let generateTreeObject = function generateTreeObject (dir, ignore) {
  let obj = {}
  let files = fs.readdirSync(dir)
  if (ignore) {
    files = files.filter(item => {
      return ignore.every(ig => {
        return ig !== item
      })
    })
  }
  let file,stat,filepath
  while (file = files.shift()){
    filepath = path.resolve(dir, file)
    stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      let newfiles = fs.readdirSync(filepath)
      files = files.concat(newfiles.map(item => {
        return `${file}/${item}`
      }))
    } else {
      JsPathToObject(dir, file, obj)
    }
  }
  return obj
}

/**
 * anonymous function - 把 asd/df/x.js => {asd:{df:{x:require('asd/df/x.js')}}}
 *
 * @param  {type} dir      根路径
 * @param  {type} filepath 文件名
 * @param  {type} obj = {} 返回的数据
 * @return {type}          对象树🌲
 */
let JsPathToObject = function (dir, filepath, obj = {}) {
  let d = require(path.resolve(dir, filepath))
  let p = filepath.substr(0, filepath.length - 3).split('/')
  if (p.length === 1) {
    // 如果是index，则提出来到外侧
    let prop = p.pop()
    if (prop === 'index') {
      Object.assign(obj, d)
    } else {
      obj[prop] = d
    }
  } else {
    p.reduce((previous, current, index) => {
      var o = {}
      o[current] = {}
      if (index === p.length - 1) {
        // 如果是index，则提出来到外侧
        if (current === 'index')
          o = d
        else
          o[current] = d
      }
      // 防止被覆盖
      return previous[current] || Object.assign(previous, o)[current]
    }, obj)
  }
  return obj
}

module.exports = {
  isPlainObject: isPlainObject,
  addToGlobal: addToGlobal,
  ENV: ENV,
  getProjectPath: getProjectPath,
  generateTreeObject: generateTreeObject
}
