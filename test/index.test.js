require('should')
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
    done()
  })
})

describe('radar startup', function () {
  before(function () {
    request = supertest('localhost:' + port)
  })
  it('# 支持get方法', function (done) {
    request
      .get('/route3')
      .expect(200)
      .end((err, response) => {
        if (err) return done(err)
        response.text.should.equal('get')
        done()
      })
  })
  it('# 支持post方法', function (done) {
    request
      .post('/route3')
      .expect(200)
      .end((err, response) => {
        if (err) return done(err)
        response.text.should.equal('post')
        done()
      })
  })
  it('# 支持put方法', function (done) {
    request
      .put('/route3')
      .expect(200)
      .end((err, response) => {
        if (err) return done(err)
        response.text.should.equal('put')
        done()
      })
  })
  it('# 支持patch方法', function (done) {
    request
      .patch('/route3')
      .expect(200)
      .end((err, response) => {
        if (err) return done(err)
        response.text.should.equal('patch')
        done()
      })
  })
  it('# 支持delete方法', function (done) {
    request
      .delete('/route3')
      .expect(200)
      .end((err, response) => {
        if (err) return done(err)
        response.text.should.equal('delete')
        done()
      })
  })
  it('# 访问路由 "/"', function (done) {
    request
      .get('/')
      .expect(200)
      .end(done)
  })
  it('# 全局filter 加 普通路由', function (done) {
    request
      .get('/route')
      .expect(200)
      .end((err, response) => {
        if (err) return console.log(err) && done()
        response.body.controller.should.equal('c1')
        response.body.filter.should.equal('f1,f2,f3')
        done()
      })
  })
  it('# 全局filter 加 指定路由下还有特定的filter', function (done) {
    request
      .get('/route2')
      .expect(200)
      .end((err, response) => {
        if (err) return console.error(err) && done()
        response.body.controller.should.equal('c1')
        response.body.filter.should.equal('f1,f2,f3,f4')
        done()
      })
  })
})
