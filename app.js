'use strict'

let app = require('./lib')

app.start(function (err) {
  if (err) return console.log(err)
  console.log(radar)
  console.log('start on port', radar.config.port, new Date())
})
