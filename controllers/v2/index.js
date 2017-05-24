module.exports = {
  'get ye/asd/asd/1': function (ctx, next) {
    ctx.body = '你还在想着他吗'
    return next()
  },
  'get /fff/asd': async (ctx, next) => {
    ctx.body = 'just dance!'
    return next()
  }
}
