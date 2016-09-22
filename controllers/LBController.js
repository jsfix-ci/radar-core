module.exports = {
  'lb': function (ctx, next) {
    ctx.body += 'i am Leebox!!!!!!!!!!'
    return next()
  },
  'get /xin': function (ctx, next) {
    ctx.body = '心太软'
    return next()
  }
}
