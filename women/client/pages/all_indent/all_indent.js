// pages/all_indent/all_indent.js
var app = getApp();
var url_list = require('../../config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasIndent:false
  },
  toSY: function (event) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var data = {
      'user_id': app.globalData.user_id
    };
    app.getIndent(that,data);
  }
})