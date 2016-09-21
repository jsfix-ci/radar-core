// const should = require('should')
const supertest = require('supertest')
const sinon = require('sinon')
const app = require('..')
let spy = sinon.spy()
let request
var port = 2334

// 初始化
app.use(function (ctx, next) {
  ctx.spy = spy
  return next()
})

before(function (done) {
  app.start({
    port: port
  }, function (err) {
    if (err) return done(err)
    console.log('start on port 2334')
    console.log(radar)
    done()
  })
})

describe('radar startup', function () {
  before(function () {
    request = supertest('localhost:' + port)
  })
  it('访问路由 "/"', function (done) {
    request
      .get('/')
      .expect(200)
      .end(done)
  })
})
