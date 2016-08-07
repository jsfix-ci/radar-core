require('should')
const logger = require('log4js')
const requestLog = logger.getLogger('testr equest')

module.exports = {
  logger: function (ctx, next) {
    ctx.spy()
    ;(++ctx.index).should.equal(1)
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      requestLog.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  },
  beforeCase: function (ctx, next) {
    // You Can Use before Middleware on here
    ctx.spy()
    ;(++ctx.index).should.equal(2)
    return next()
  }
}
