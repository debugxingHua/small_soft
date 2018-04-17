var url_list = require("../../config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasFavorite :false,
    shop_name:app.globalData.shop_name
  },
  toSY: function (event) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  toContent: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_content/shop_content?id=' + id
    })
  },
  delete_favorite:function(e){
    var that = this;
    var favorite_id = e.currentTarget.dataset.id;
    wx.request({
      url: url_list.url_list.deleteFavorite,
      data:{
        favorite_id: favorite_id
      },
      success:function(res){
        app.getFavorite(that);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getFavorite(that);
  }
})