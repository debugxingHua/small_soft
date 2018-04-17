/**
"projectname": "women","projectname": "women","projectname": "women",womenwomenwom * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://7sxtx1ju.qcloud.la';

var config = {
  host: `index.php`,
  // 上传图片接口
  uploadUrl: `${host}/upload`,

  getSwiperSelect: `${host}/getSwiperSelect.php`,
  getCommoditySelect: `${host}/getCommoditySelect.php`,
  // 获取购物车信息，和getCart区分靠传入rt参数。
  getCart: `${host}/getShopCartSelect.php`,
  // 添加购物车
  addShopCart: `${host}/addShopCart.php`,
  // 更新购物车商品数量
  updateCartCount: `${host}/updateShopCartCountBySCId.php`,
  // 更新购物车选中状态
  updateCartSelected: `${host}/updateShopCartSelectedBySCId.php`,
  // 更新全选状态
  updateCartAllSelected: `${host}/updateShopCartAllSelectedBySCId.php`,
  deleteShopCartComodityById: `${host}/deleteShopCartComodityById.php`, 
  getCommodityById: `${host}/getCommodityById.php`,
  getCommodityImgById: `${host}/getCommodityImgById.php`,
  getUserInfo: `${host}/getUserInfo.php`,
  saveUser: `${host}/saveUser.php`,
  //地址
  addAddress: `${host}/address/addAddress.php`, 
  getAddressListByUserId: `${host}/address/getAddressListByUserId.php`,

  //订单
  addIndent: `${host}/indent/addIndent.php`,
  getIndentByStatus: `${host}/indent/getIndentByStatus.php`,
  addCartIndent: `${host}/indent/addCartIndent.php`,
  //收藏
  addFavorite: `${host}/favorite/addFavorite.php`,
  getFavorite: `${host}/favorite/getFavorite.php`, 
  deleteFavorite: `${host}/favorite/deleteFavorite.php`,
};

module.exports = {
  url_list: config
};