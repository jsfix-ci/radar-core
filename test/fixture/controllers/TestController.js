module.exports = {
  test: function (ctx, next) {
    ctx.body = 'test'
    console.log('i am controller')
    return next()
  }
}
