const logger = require('log4js')
const requestLog = logger.getLogger('request')

module.exports = {
  logger: function (ctx, next) {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      requestLog.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  },
  beforeCase: function (ctx, next) {
    // You Can Use before Middleware on here
    return next()
  }
}
