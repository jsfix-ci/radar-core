'use strict'

let app = require('./lib')

app.start(function (err) {
  if (err) return console.log(err)
  console.log('开始', new Date())
})
