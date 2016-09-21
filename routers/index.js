module.exports = {
  'get /rhyme': 'SampleController',
  'get /': {
    controller: 'LBController.lb',
    filter: ['LBFilter.lb']
  }
}
