module.exports = {
  'get /rhyme': 'SampleController',
  '/': {
    controller: 'LBController.lb',
    filter: ['LBFilter.lb']
  }
}
