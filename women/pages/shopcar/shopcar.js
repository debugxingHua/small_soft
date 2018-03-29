var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: "女王的衣柜",
    money_all:100
  },
  jia:function(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    var count = event.currentTarget.dataset.count;
    count = parseInt(count) + 1;    
    app.updateCartCount(that, id, count);
  },
  jian: function (event) {
    var that = this;    
    var id = event.currentTarget.dataset.id;
    var count = event.currentTarget.dataset.count;
    count = parseInt(count) -1;
    app.updateCartCount(that, id, count);
  },
  inputCount:function(event){
    // console.log(event.detail.value);
    var that = this;    
    var id = event.currentTarget.dataset.id;
    var count = event.detail.value;
    app.updateCartCount(that, id, count);
  },
  inputCount_stop: function (event) {
    // 停止向上冒泡
  },
  to_pay: function(event){
    console.log(event);
    wx.navigateTo({
      url: '../payment/payment'
    })
  },
  onShow: function (options) {
    var that = this;
    app.getCart(that);
  },
  toSY:function(event){
    wx.switchTab({
      url: '../index/index',
    })
  },
  toContent: function (event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_content/shop_content?id=' + id
    })
  },
  delete_commodity:function (event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    wx.request({
      url: 'http://weixin.com/admin/deleteShopCartComodityById.php',
      data: {
        'id': id
      },
      success: function(res){
        console.log(res.data);
        if(res.data.num > 0){
          wx.showToast({
            title: '删除成功',
            icon: 'succes',
            duration: 1000
          })
        }
        app.getCart(that);
      }
    })
  },
  checkbox_all: function(event){
    console.log(event);
  }
})