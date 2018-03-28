Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: "女王的衣柜",
    money_all:100
  },
  to_pay: function(event){
    console.log(event);
    wx.navigateTo({
      url: '../payment/payment'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取后台shopcart数据
    wx.request({
      url: 'http://weixin.com/admin/getShopCartSelect.php',
      success:function(res){
        console.info(res.data);
        that.setData({
          shop_cart_array: res.data
        });
      }
    })
  },
  checkbox_all: function(event){
    console.log(event);
  }
})