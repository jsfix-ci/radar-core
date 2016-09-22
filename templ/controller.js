module.exports = {
  'get /': function (ctx, next) {
    ctx.body = 'welcome radar-core'
    return next()
  },
  'notfound': function (ctx, next) {
    ctx.body = 404
    return next()
  }
}
