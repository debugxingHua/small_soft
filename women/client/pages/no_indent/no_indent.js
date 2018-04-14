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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //2已发货但没收
    var data = {
      'user_id': app.globalData.user_id,
      'status':2
    };
    app.getIndent(that, data);
  }
})