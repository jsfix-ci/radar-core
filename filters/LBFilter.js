module.exports = {
  lb: function (ctx, next) {
    ctx.body = 'Leebox Filter '
    return next()
  }
}
