var app = getApp();
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