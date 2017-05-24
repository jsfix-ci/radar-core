module.exports = {
  'get caca': async (ctx, next) => {
    ctx.body = '200 '
    return next()
  }
}