// var text_list = require("../../datas/text_list.js");
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
    // 调用api,得到文章列表
    wx.request({
      url: 'http://szhtdms.3whost.com.cn/admin.php?c=api&a=indexData',
      header :{
        'content-type': 'application/json' // 默认值
      },
      success : function(res){
        // console.log(res.data.data);
        // 传入数据
        that.setData({
          text_list: res.data.data
        });
      }
    })
  },
  //id传到内容页面
  toContent : function(event){
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    // console.log(id);
    wx.navigateTo({
      url: '../text_content/text_content?id='+id+'&title='+title
    })
  }
})