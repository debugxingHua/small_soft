var app = getApp();
var url_list = require('../../config.js');
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
    //1未付款
    var data = {
      'user_id': app.globalData.user_id,
      'status': 1
    };
    app.getIndent(that, data);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  }
})