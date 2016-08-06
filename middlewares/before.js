module.exports = {
  beforeTest: function (ctx, next) {
    console.log(`I am beforeTest`)
    return next()
    console.log(`I am beforeTest2`)
    console.log(`I am beforeTest3`)
  },
  be: function (ctx, next) {
    console.log('i am be')
    return next()
  }
}
