module.exports = {
  'lb': function (ctx, next) {
    ctx.body += 'i am Leebox!!!!!!!!!!'
    return next()
  }
}
