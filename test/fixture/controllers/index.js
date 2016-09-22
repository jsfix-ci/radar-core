module.exports = {
  'get test': function (ctx, next) {
    ctx.body = 'i am simple route'
    return next()
  },
  'get service': function (ctx, next) {
    ctx.body = radar.service.SampleService()
    return next()
  }
}
