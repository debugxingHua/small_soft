//app.js
App({
  onLaunch: function () {},
  globalData: {
    userinfo : '',
    pbl_datas : '',
    commodity : '',
    shop_cart_count: 0
  },
  // 获取购物车数据
  getCart: function (that) {
    // 获取后台shopcart数据
    wx.request({
      url: 'http://weixin.com/admin/getShopCartSelect.php',
      success: function (res) {
        // console.info(res.data.length);
        that.setData({
          shop_cart_array: res.data,
          shop_cart_length: res.data.length
        });
      }
    })
  },
  // 添加购物车
  addCart: function (commodity_id, color, size, count){
    wx.request({
      url: 'http://weixin.com/admin/addShopCart.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        commodity_id: commodity_id,
        color: color,
        size: size,
        count: count
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data != null) {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },
  // 更新购物车的count
  updateCartCount: function (that, id,count){
    wx.request({
      url: 'http://weixin.com/admin/UpdateShopCartComodityBySCId.php?id=27&count=15',
      data: {
        id: id,
        count: count
      },
      success: function (res) {
        console.log(res);
        // 重新加载购物车，并计算商品价格。
        getApp().getCart(that);
      }
    })
  }
})