// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  to_all_indent:function(event){
    wx.navigateTo({
      url: '../all_indent/all_indent'
    })
  },
  to_no_pay: function (event) {
    wx.navigateTo({
      url: '../no_pay/no_pay'
    })
  },
  to_no_indent: function (event) {
    wx.navigateTo({
      url: '../no_indent/no_indent'
    })
  },
  to_address: function (event) {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  to_service: function (event) {
    wx.navigateTo({
      url: '../service/service'
    })
  },
  to_favorite: function (event) {
    wx.navigateTo({
      url: '../favorite/favorite'
    })
  },
  to_red_bage: function (event) {
    wx.navigateTo({
      url: '../red_bage/red_bage'
    })
  }
})