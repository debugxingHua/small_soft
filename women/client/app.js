//app.js
var url_list = require('./config.js');
App({
  globalData: {
    user_id:'',
    pbl_datas : '',
    commodity : '',
    shop_cart_count: 0,
    commodity_cart_buy:{}
  },
  // 获取购物车数据
  getCart: function (that) {
    var user_id = this.globalData.user_id;
    // 获取后台shopcart数据
    wx.request({
      url: url_list.url_list.getCart,
      data: {
        user_id: user_id
      },
      success: function (res) {
        // console.log(res);
        var data = res.data;
        var length = data.length;
        var money_all = 0;
        var selected_all = true;
        var sc_id_array_no = Array();
        var sc_id_array_all = Array();
        var sc_array_select = Array();
        // 遍历集合，计算所有选中的总价
        for (var i = 0; i < length; i++) {
          if (data[i].selected == 1) {
            money_all += parseInt(data[i].money_now) * parseInt(data[i].count)
            sc_id_array_all[sc_id_array_all.length] = data[i].sc_id;
            sc_array_select[sc_array_select.length] = data[i];
          } else {
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
          sc_id_array_no: sc_id_array_no,
          sc_array_select: sc_array_select
        });
      }
    })
  },
  // 添加购物车
  addCart: function (commodity_id, color, size, count){
    var user_id = this.globalData.user_id; 
    wx.request({
      url: url_list.url_list.addShopCart,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        user_id: user_id,
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
    //先判断当前是否存在user_id
    var user_id = this.globalData.user_id;
    wx.request({
      url: url_list.url_list.updateCartCount,
      data: {
        id: id,
        user_id: user_id,
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
    //先判断当前是否存在user_id
    var user_id = this.globalData.user_id;
    wx.request({
      url: url_list.url_list.updateCartSelected,
      data: {
        id: id,
        user_id: user_id,
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
    //先判断当前是否存在user_id
    var user_id = this.globalData.user_id;
    wx.request({
      user_id: user_id,
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
  //删除购物车商品
  delete_cart_commodity: function (that,commodity_id) {
    var user_id = this.globalData.user_id;
    wx.request({
      url: url_list.url_list.deleteShopCartComodityById,
      data: {
        'id': commodity_id,
        'user_id': user_id
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.num > 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'succes',
            duration: 1000
          })
        }
        getApp().getCart(that);
      }
    })
  },
  // 结算选中的商品
  getShopCartSelected:function(that, rt){
    var user_id = this.globalData.user_id;
    wx.request({
      url: url_list.url_list.getCart,
      data: {
        rt: rt,
        user_id:user_id
      },
      success: function (res) {
        that.setData({
          pay_commodity_list: res.data
        });
      }
    })
  },
  onLaunch:function(){
    var that = this;
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
              // console.log('???'+res.data.user_id);
              //保存用户id
              that.globalData.user_id = res.data.user_id;
              if (res.data.errMsg == 'time_out'){
                console.log('过期了');
                try {
                  wx.removeStorageSync('userInfo')
                } catch (e) {
                  console.log('error:'+e);
                }
              } else if (res.data.errMsg == 'time_again'){
                console.log('有效');
              }else{
                console.log('new');
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getAddressListByUserId: function (that) {
    //获取地址列表
    wx.request({
      url: url_list.url_list.getAddressListByUserId,
      data: {
        user_id: this.globalData.user_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data);
        if (res.data.errMsg != "空") {
          that.setData({
            addressList: res.data,
            hasAddress: true
          });
        }
      }
    })
  },
  getIndent:function(that,data){
    wx.request({
      url: url_list.url_list.getIndentByStatus,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //判断返回参数
        if(res.data.errMsg != '空'){
          that.setData({
            hasIndent: true,
            indentList: res.data.indent
          });
        }
        console.log(res.data);        
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  }
})