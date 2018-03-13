var text_list = require("../../datas/text_list.js");
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
    this.setData({
      text_list: text_list.text_list
    });
  },
  toContent : function(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../text_content/text_content?id='+id
    })
  }
})