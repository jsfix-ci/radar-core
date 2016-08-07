require('should')
const Koa = require('koa')
const app = new Koa()
const supertest = require('supertest')
const sinon = require('sinon')
let request
let applyMiddleware = require('../../lib/middleware')

let spy = sinon.spy()

// 初始化
app.use(function (ctx, next) {
  ctx.index = 0
  ctx.spy = spy
  ctx.body = '2333'
  return next()
})

applyMiddleware(app)

app.use(function (ctx, next) {
  ctx.spy()
  ;(++ctx.index).should.equal(3)
  return next()
})

describe('测试中间件', function () {
  before(function (done) {
    app.listen(2000, function () {
      request = supertest('localhost:2000')
      done()
    })
  })
  it('测试', function (done) {
    request
      .get('/before')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err
        }
        ;(4).should.equal(spy.callCount)
        done()
      })
  })
})
