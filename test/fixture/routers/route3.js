// 支持五种http method
module.exports = {
  'get /': 'controller.get',
  'post /': 'controller.post',
  'delete /': 'controller.delete',
  'put /': 'controller.put',
  'patch /': 'controller.patch'
}
