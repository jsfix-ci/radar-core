module.exports = {
  'ye': function (ctx, next) {
    ctx.body = '你还在想着他吗'
    return next()
  }
}
