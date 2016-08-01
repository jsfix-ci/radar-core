const fs = require('fs-extra')
const path = require('path')
const globalName = 'rhyme'
global[globalName] = {}

exports.isPlainObject = function isPlainObject (obj) {
  return Object.keys(obj).length === 0
}

exports.addToGlobal = function addToGlobal (property, obj) {
  Object.assign(global[globalName][property] || {}, obj)
}

/**
 * generateTreeObject - description
 *
 * @param  {type} dir    absolute path
 * @param  {type} ignore ignore path, Array
 * @return {type}        description
 */
exports.generateTreeObject = function generateTreeObject (dir, ignore) {
  let files = fs.readdirSync(dir)
  if (ignore) {
    files = files.filter(item => {
      return ignore.every(ig => {
        return ig !== item
      })
    })
  }
  // let paths =
  console.log(files)
}
