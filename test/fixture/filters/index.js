module.exports = {
  SampleFilter: function (ctx, next) {
    console.log('i am SampleFilter')
    ctx['FILTER'] = 'SampleFilter'
    return next()
  }
}
