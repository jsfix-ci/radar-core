// 全局filter 加 指定路由下还有特定的filter
module.exports = {
  filter: ['filter.f1', 'filter.f2', 'filter.f3'],
  '/': {
    controller: 'controller.c1',
    filter: ['filter.f4']
  }
}
