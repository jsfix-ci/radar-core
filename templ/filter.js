module.exports = {
  SampleFilter: function (ctx, next) {
    ctx['FILTER'] = 'filter'
    return next()
  }
}
