// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})