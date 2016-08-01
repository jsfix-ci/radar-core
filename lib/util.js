const globalName = 'rhyme'
global[globalName] = {}

exports.isPlainObject = function isPlainObject (obj) {
  return Object.keys(obj).length === 0
}

exports.addToGlobal = function addToGlobal (property, obj) {
  Object.assign(global[globalName][property] || {}, obj)
}

exports.generateTreeObject = function generateTreeObject (dir) {}
