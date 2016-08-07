require('should')

module.exports = {
  afterCase: function (ctx, next) {
    // You Can Use After Middleware on here
    ctx.spy()
    ;(++ctx.index).should.equal(4)
    return next()
  }
}
