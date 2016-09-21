require('should')

module.exports = {
  afterCase: function (ctx, next) {
    // You Can Use After Middleware on here
    ctx.spy()
    if (ctx.index > -1) {
      ;(++ctx.index).should.equal(4)
    }
    return next()
  }
}
