var app = getApp();
Page({
  data : {
    color_tj : "#ff0033",
    color_zx : "#000000",
    color_zr : "#000000"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取swiper图片
    wx.request({
      url: 'http://hexinghua.club/weixin/getSwiperSelect.php',
      success :function(result){
        // console.log(result);
        that.setData({
          swiper_datas: result.data
        });
      }
    });

    // 获取瀑布流数据
    wx.request({
      url: 'http://hexinghua.club/weixin/getCommoditySelect.php',
      success: function (result) {
        // console.log(result);
        app.globalData.pbl_datas = result.data
        that.setData({
          pbl_datas: app.globalData.pbl_datas
        });
      }
    });

  },
  tj : function(event){
    this.setData({
      color_tj: "#ff0033",
      color_zx: "#000000",
      color_zr: "#000000",
      pbl_datas: app.globalData.pbl_datas
    });
  },
  zx: function (event) {
    this.setData({
      color_tj: "#000000",
      color_zx: "#ff0033",
      color_zr: "#000000",
      pbl_datas: app.globalData.pbl_datas
    });
  },
  zr: function (event) {
    this.setData({
      color_tj: "#000000",
      color_zx: "#000000",
      color_zr: "#ff0033",
      pbl_datas: app.globalData.pbl_datas
    });
  },
  toContent:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_content/shop_content?id='+id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '自定义，一般写小程序的名字',
      path: '这里写你这个页面的路径',
      imageUrl:'这个是显示的图片，不写就默认当前页面的截图',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete:function(res){
        // 不管成功失败都会执行
      }
    }
  }
})