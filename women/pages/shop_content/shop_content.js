Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  tosy: function (event){
    wx.switchTab({
      url: '../index/index',
    })
  },
  tocart: function (event){
    wx.switchTab({
      url: '../shopcar/shopcar',
    })
  },
  addcart:function(event){
    var commodity_id = event.currentTarget.dataset.id;
    wx.request({
      url: 'http://weixin.com/admin/addShopCart.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        commodity_id: commodity_id,
        color:'duot2',
        size:18,
        count:1
      },
      success:function(res){
        // console.log(res.data);
        if(res.data != null){
          wx.showToast({
            title: '加入成功',
            icon: 'succes',
            duration: 1000,
            mask:true
          })
        }else{
          wx.showToast({
            title: '失败',
            icon: 'error',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },
  bug: function (event){
    console.log(event);
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
      success: function (result) {
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