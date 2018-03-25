var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var commodity_id = options.id;
    
    // 根据id获取商品
    wx.request({
      url: 'http://hexinghua.club/weixin/getCommodityById.php',
      data: {
        commodity_id: commodity_id
      },
      method: 'GET',
      success:function(result){
        // console.info(result.data);
        app.globalData.commodity=result.data;
        that.setData({
          commodity_data: result.data
        });
      }
    });

    // 根据id获取图片
    wx.request({
      url: 'http://hexinghua.club/weixin/getCommodityImgById.php',
      data: {
        commodity_id: commodity_id
      },
      method: 'GET',
      success: function (result) {
        // console.info(result);
        that.setData({
          swiper_img: result.data
        });
      }
    });
  },
  tosy : function(option){
    wx.switchTab({
      url: '../index/index',
    })
  },
  tocart: function(option){
    wx.switchTab({
      url: '../shopcar/shopcar',
    })
  },
  addcart:function(option){
    // console.log(app.globalData.shop_cart_array);
    //加入购物车
    app.globalData.shop_cart_array.push(app.globalData.commodity);
  },
  bug: function (option){
    console.log(option);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '女人的衣柜',
      path: '/pages/shop_content/shop_content?commodity_id=' + app.globalData.commodity.commodity_id,
      success: function (shareTickets) {
        console.info(shareTickets+'成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res+'失败');
        // 转发失败
      }
    }
  }
})