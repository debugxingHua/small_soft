var pbl = require("../../datas/pbl.js");
var swiper = require("../../datas/swiper.js");

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
    this.setData({
      swiper_datas: swiper.swiper_datas,
      pbl_datas: pbl.pbl_datas
    });
  },
  tj : function(event){
    this.setData({
      color_tj: "#ff0033",
      color_zx: "#000000",
      color_zr: "#000000",
      pbl_datas: pbl.pbl_datas
    });
  },
  zx: function (event) {
    this.setData({
      color_tj: "#000000",
      color_zx: "#ff0033",
      color_zr: "#000000",
      pbl_datas: pbl.pbl_datas2
    });
  },
  zr: function (event) {
    this.setData({
      color_tj: "#000000",
      color_zx: "#000000",
      color_zr: "#ff0033",
      pbl_datas: pbl.pbl_datas3
    });
  },
  toContent:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_content/shop_content?id='+id
    })
  }
})