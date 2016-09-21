const app = require('..')
console.log(app)
before(function (done) {
  console.log('asd')
  app.start({
    port: 2334
  }, function (err) {
    if (err) console.log(err)
    console.log('start on port 2334')
    done()
  })
})
