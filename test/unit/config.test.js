let should = require('should')
let config = require('../../lib/config')
let test_config = { asd: { asd: '111' },
  index: 1,
  nest: {
    rain: 'rain',
    n: {
      work: '!'
    }
  },
  env: {
    development: {
      port: 2333
    },
    staging: {
      port: 2333
    },
    production: {
    port: 2333 }
  }
}
describe('test config', () => {
  it('equal fixture config',()=>{
    test_config.should.eql(config)
  })
})
