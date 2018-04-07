var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'ko'
  },
  tanchu:function(){
    wx.showActionSheet({
      itemList: ['a','b','c'],
    })
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
    app.getShopCartSelected(that,'结算');
    that.setData({
      pay_commodity_list: app.globalData.pay_commodity_list
    });
  },
  toContent:function(event){
    console.log(event);
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_content/shop_content?id='+id
    })
  }
})