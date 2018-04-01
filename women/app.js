//app.js
var url = require("/utils/url.js");
App({
  globalData: {
    userinfo : '',
    pbl_datas : '',
    commodity : '',
    shop_cart_count: 0,
    pay_commodity_list:Array()
  },
  // 获取购物车数据
  getCart: function (that) {
    // 获取后台shopcart数据
    wx.request({
      url: url.url_list.getCart,
      success: function (res) {
        var data = res.data;
        var length = data.length;
        var money_all = 0;
        var selected_all = true;
        var sc_id_array_no = Array();
        var sc_id_array_all = Array();
        // 遍历集合，计算所有选中的总价
        for(var i = 0;i<length; i++){
          if (data[i].selected == 1){
            money_all += parseInt(data[i].money_now) * parseInt(data[i].count)
            sc_id_array_all[sc_id_array_all.length] = data[i].sc_id;
          }else{
            selected_all = false;
            sc_id_array_no[sc_id_array_no.length] = data[i].sc_id;
          }
        }
        // 将数据赋值
        that.setData({
          shop_cart_array: res.data,
          shop_cart_length: length,
          money_all: money_all,
          selected_all: selected_all,
          sc_id_array_all: sc_id_array_all,
          sc_id_array_no: sc_id_array_no
        });
      }
    })
  },
  // 添加购物车
  addCart: function (commodity_id, color, size, count){
    wx.request({
      url: url.url_list.addShopCart,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        commodity_id: commodity_id,
        color: color,
        size: size,
        count: count
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data != null) {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },
  // 更新购物车的count
  updateCartCount: function (that, id,count){
    wx.request({
      url: url.url_list.updateCartCount,
      data: {
        id: id,
        count: count
      },
      success: function (res) {
        // console.log(res);
        // 重新加载购物车，并计算商品价格。
        getApp().getCart(that);
      }
    })
  },
  // 更新购物车的selected
  updateCartSelected: function (that, id, selected) {
    wx.request({
      url: url.url_list.updateCartSelected,
      data: {
        id: id,
        selected: selected
      },
      success: function (res) {
        // console.log(res);
        // 重新加载购物车，并计算商品价格。
        getApp().getCart(that);
      }
    })
  },
  // 更新购物车全选的selected
  updateCartAllSelected: function (that, sc_id_array, selected) {
    wx.request({
      url: url.url_list.updateCartAllSelected,
      data: {
        id: sc_id_array,
        selected: selected
      },
      success: function (res) {
        // console.log(res.data);
        // 重新加载购物车，并计算商品价格。
        getApp().getCart(that);
      }
    })
  },
  // 结算选中的商品
  getShopCartSelected:function(that, rt){
    wx.request({
      url: url.url_list.getCart,
      data:{
        rt: rt
      },
      success:function(res){
        console.log('hhh:'+res.data);
        that.setData({
          pay_commodity_list: res.data
        });
      }
    })
  }
})