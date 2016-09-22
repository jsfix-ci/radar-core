module.exports = {
  c1: function (ctx, next) {
    ctx.body = {
      controller: 'c1',
      filter: ctx.filter
    }
    return next()
  },
  get: function (ctx, next) {
    ctx.body = 'get'
    return next()
  },
  post: function (ctx, next) {
    ctx.body = 'post'
    return next()
  },
  delete: function (ctx, next) {
    ctx.body = 'delete'
    return next()
  },
  patch: function (ctx, next) {
    ctx.body = 'patch'
    return next()
  },
  put: function (ctx, next) {
    ctx.body = 'put'
    return next()
  }
}
