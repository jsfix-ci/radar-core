module.exports = {
  f1: function (ctx, next) {
    ctx.filter = 'f1'
    return next()
  },
  f2: function (ctx, next) {
    ctx.filter += ',f2'
    return next()
  },
  f3: function (ctx, next) {
    ctx.filter += ',f3'
    return next()
  },
  f4: function (ctx, next) {
    ctx.filter += ',f4'
    return next()
  }
}
