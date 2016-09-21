module.exports = {
  test: function (ctx, next) {
    ctx.body = 'test'
    return next()
  }
}
