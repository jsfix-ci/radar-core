module.exports = {
  'extends': 'standard',
  'installedESLint': true,
  'plugins': [
    'standard'
  ],
  'parserOptions': {
    'ecmaVersion': 6
  },
  'env': {
    'node': true,
    'mocha': true
  },
  rules: {
    'no-new-func': 0
  },
  'globals': {
    'radar': true
  }
}
