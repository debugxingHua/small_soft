var app = getApp();
var url_list = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: "女王的衣柜"
  },
  // 检查单个全选状态
  bindCheckbox:function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    var data = that.data.shop_cart_array[index];
    var selected = data.selected;
    // 改变状态并计算
    if (selected == 1){
      selected = 2;
      app.updateCartSelected(that,data.sc_id,selected);     
    } else if (selected == 2){
      selected = 1;
      app.updateCartSelected(that, data.sc_id, selected);
    }else{
      return;
    }
  },
  // 全选
  bindCheckAll: function (event) {
    var that = this;
    var selected_all = that.data.selected_all;
    var selected = 0;
    var sc_id_array = Array();
    if(selected_all){
      selected = 2;
      sc_id_array = that.data.sc_id_array_all;
    }else{
      selected = 1;
      sc_id_array = that.data.sc_id_array_no;
    }
    app.updateCartAllSelected(that, sc_id_array, selected);
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
    if (count <= 0) {
      return;
    } else {
      app.updateCartCount(that, id, count);
    }
  },
  inputCount:function(event){
    // console.log(event.detail.value);
    var that = this;    
    var id = event.currentTarget.dataset.id;
    var count = event.detail.value;
    if(count == 0){
      count = 1;
    }
    app.updateCartCount(that, id, count);
  },
  inputCount_stop: function (event) {
    // 停止向上冒泡
  },
  to_pay: function(event){
    app.globalData.sc_array_select = this.data.sc_array_select;
    var money_all = this.data.money_all;
    wx.navigateTo({
      url: '../payment/payment?money_all='+money_all+'&types=cart'
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
    app.delete_cart_commodity(that,id);
  }
})