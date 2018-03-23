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
        // console.info(result);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})