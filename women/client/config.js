/**
"projectname": "women","projectname": "women","projectname": "women",womenwomenwom * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://7sxtx1ju.qcloud.la';

var config = {
  host: `index.php`,
  // 上传图片接口
  uploadUrl: `${host}/upload`,

  getSwiperSelect: `${host}/swiper/getSwiperSelect.php`,
  // 购物车
  getCart: `${host}/shopCart/getShopCartSelect.php`,
  addShopCart: `${host}/shopCart/addShopCart.php`,
  updateCartCount: `${host}/shopCart/updateShopCartCountBySCId.php`,
  updateCartSelected: `${host}/shopCart/updateShopCartSelectedBySCId.php`,
  updateCartAllSelected: `${host}/shopCart/updateShopCartAllSelectedBySCId.php`,
  deleteShopCartComodityById: `${host}/shopCart/deleteShopCartComodityById.php`,
  //商品
  getCommodityById: `${host}/commodity/getCommodityById.php`,
  getCommoditySelect: `${host}/commodity/getCommoditySelect.php`,  
  getCommodityImgById: `${host}/commodity/getCommodityImgById.php`,
  getUserInfo: `${host}/user/getUserInfo.php`,
  saveUser: `${host}/user/saveUser.php`,
  //地址
  addAddress: `${host}/address/addAddress.php`, 
  getAddressListByUserId: `${host}/address/getAddressListByUserId.php`,

  //订单
  getIndentByStatus: `${host}/indent/getIndentByStatus.php`,
  addCartIndent: `${host}/indent/addCartIndent.php`,
  
  //收藏
  addFavorite: `${host}/favorite/addFavorite.php`,
  getFavorite: `${host}/favorite/getFavorite.php`, 
  deleteFavorite: `${host}/favorite/deleteFavorite.php`,
  //红包
  getRedBag: `${host}/redBag/getRedBag.php`,
  deleteRedBag: `${host}/redBag/deleteRedBag.php`,
};

module.exports = {
  url_list: config
};