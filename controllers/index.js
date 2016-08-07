module.exports = {
  'SampleController': function (ctx, next) {
    ctx.body = 'i am controller'
    return next()
  }
}
