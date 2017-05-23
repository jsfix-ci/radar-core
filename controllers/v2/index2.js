module.exports = {
  'ye': function (ctx, next) {
    ctx.body = '你还在想着他吗'
    return next()
  },
  'get asd': async (ctx, next) => {
    ctx.body = 'test'
    return next()
  }
}
