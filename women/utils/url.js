var url_list = {
  // 获取购物车信息，和getCart区分靠传入rt参数。
  getCart: 'http://weixin.com/admin/getShopCartSelect.php',
  // 添加购物车
  addCart: 'http://weixin.com/admin/addShopCart.php',
  // 更新购物车商品数量
  updateCartCount: 'http://weixin.com/admin/updateShopCartCountBySCId.php',
  // 更新购物车选中状态
  updateCartSelected: 'http://weixin.com/admin/updateShopCartSelectedBySCId.php',
  // 更新全选状态
  updateCartAllSelected: 'http://weixin.com/admin/updateShopCartAllSelectedBySCId.php'
}

module.exports = {
  url_list: url_list
}