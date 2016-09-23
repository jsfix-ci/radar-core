'use strict'

let app = require('./lib')
console.log(test)
app.start(function (err) {
  if (err) return console.log(err)
  console.log('start on port', radar.config.port, new Date())
})
