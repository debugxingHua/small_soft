//app.js
var url_list = require('./config.js')
App({
  globalData: {
    pbl_datas : '',
    commodity : '',
    shop_cart_count: 0,
    pay_commodity_list:Array()
  },
  // 获取购物车数据
  getCart: function (that) {
    // 获取后台shopcart数据
    wx.request({
      url: url_list.url_list.getCart,
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
      url: url_list.url_list.addShopCart,
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
      url: url_list.url_list.updateCartCount,
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
      url: url_list.url_list.updateCartSelected,
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
      url: url_list.url_list.updateCartAllSelected,
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
      url: url_list.url_list.getCart,
      data:{
        rt: rt
      },
      success:function(res){
        that.setData({
          pay_commodity_list: res.data
        });
      }
    })
  },
  onLaunch:function(){
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回,所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });
    // 调用login获取临时登录凭证
    wx.login({
      success: function (res) {    
        if (res.code) {
          //获取用户openId和session
          wx.request({
            url: url_list.url_list.saveUser,
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data == 'time_out'){
                console.log('过期了');                
                try {
                  wx.removeStorageSync('userInfo')
                } catch (e) {
                  console.log('error:'+e);
                }
              }else if(res.data == 'not_at'){
                console.log('没登录过');
              }else{
                console.log('有效');
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})