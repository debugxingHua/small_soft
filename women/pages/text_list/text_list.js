var text_list = require("../../datas/text_list.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [
      {
        title: "白色滴美女衣服，好看哇",
        img_src: "http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=a2160861871001e95a311c4cd0671199/3801213fb80e7bec553d4269252eb9389a506b56.jpg",
        content: "123"
      },{
        title: "白色滴美女衣服，好看哇",
        img_src: "http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=a2160861871001e95a311c4cd0671199/3801213fb80e7bec553d4269252eb9389a506b56.jpg",
        content: "456"
      }
      
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      text_list: text_list.text_list
    });
  }
})