var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: "女王的1",
    money_all:100,
    data :  [
      {
        img_src: '/images/swiper/m1.jpg',
        size: "50cm",
        title: "我就是标题",
        color: "红色",
        money: "￥99",
        count: "1",
        checkbox : true
      },
      {
        img_src: '/images/swiper/m2.jpg',
        size: "50cm",
        title: "我就是标题",
        color: "红色",
        money: "￥199",
        count: "2",
        checkbox : true
      }
  ]
  },
  to_pay: function(event){
    console.log(event);
    wx.navigateTo({
      url: '../payment/payment'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  checkbox_all: function(event){
    console.log(event);
  },
  onShow: function (options) {
    this.setData({
      shop_cart_array: app.globalData.shop_cart_array
    });
    // console.log(app.globalData.shop_cart_array);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})