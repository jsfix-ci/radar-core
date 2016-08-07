require('should')
let config = require('../../lib/config')
let testConfig = { asd: { asd: '111' },
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
      port: 2333
    }
  }
}
describe('test config', () => {
  it('equal fixture config', () => {
    testConfig.should.eql(config)
  })
})
