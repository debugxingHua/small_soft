var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasRedBag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var redBag = app.globalData.redBag;
    if(redBag != ""){
      this.setData({
        redBag: app.globalData.redBag,
        hasRedBag: true        
      });
    }
  }
})