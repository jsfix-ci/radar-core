module.exports = {
  'ye': function (ctx, next) {
    ctx.body = '你还在想着他吗'
    return next()
  },
  'get /fff': async (ctx, next) => {
    ctx.body = 'just dance!'
    return next()
  }
}
