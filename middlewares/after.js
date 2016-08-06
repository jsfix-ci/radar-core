module.exports = {
  afterTest: function (ctx, next) {
    console.log(`I am afterTest1`)
    return next()
    console.log(`I am afterTest2`)
  },
  a: function (ctx, next) {
    console.log(`I am afterTest3`)
    throw Error('asd')
    return next()
    console.log(`I am afterTest4`)
  }
}
