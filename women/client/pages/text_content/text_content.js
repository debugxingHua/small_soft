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
    // 根据id请求数据
    wx.request({
      url: 'http://szhtdms.3whost.com.cn/admin.php?c=api&a=getArticleContent',
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id: options.id
      },
      success:function(res){
        that.setData({
          id: options.id,
          title: options.title,
          content: res.data.data.content
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})