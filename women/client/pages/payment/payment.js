// pages/indent/indent.js
var url_list = require('../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '空',
    leaveWordInput: '无',
    yf: 0
  },
  addAddress: function (event) {
    wx.navigateTo({
      url: '../address/address?click_types=' + 'buy',
    })
  },
  resetAddress: function () {
    wx.navigateTo({
      url: '../address/address?click_types=' + 'buy',
    })
  },
  leaveWordInput: function (e) {
    this.setData({
      leaveWordInput: e.detail.value
    })
  },
  addIndent: function (event) {
    var that = this;
    if (this.data.address == '空') {
      wx.showModal({
        title: '提示',
        content: '选择地址',
        success:function(res){
          // console.log(res);
          if(res.confirm == true){
            that.addAddress();
          }
        }
      })
    } else {
      // //开始生成订单，保存数据：address_id、commodity_id、user_id、color、count、size、red_bag、all_money
      // console.log(this.data.sc_array_select);
      // console.log(JSON.stringify(that.data.sc_array_select));
      wx.request({
        url: url_list.url_list.addCartIndent,
        data: {
          'user_id': app.globalData.user_id,
          'address_id': that.data.address.address_id,
          'types': that.data.types,
          'commodity': JSON.stringify(that.data.sc_array_select),
          'red_bag': 0,
          'yf': that.data.yf,
          'money': that.data.money_all,
          'pay_money': that.data.pay_money,
          'leave_word_input': that.data.leaveWordInput
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data);
          wx.showToast({
            title: '订单生成成功'
          });
          wx.switchTab({
            url: '../index/index',
          })
          //生成订单，去付款
          // wx.requestPayment({
          //   'timeStamp': '',
          //   'nonceStr': '',
          //   'package': '',
          //   'signType': 'MD5',
          //   'paySign': '',
          //   'success': function (res) {
          //   },
          //   'fail': function (res) {
          //   }
          // })
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sc_array_select_count = app.globalData.sc_array_select.length;
    var money_all = Number(options.money_all);//总金额
    var yf = 0;//运费
    if (sc_array_select_count == 1){
      yf = Number(app.globalData.sc_array_select[0].expressage); 
    }
    var pay_money = money_all - yf;
    that.setData({
      sc_array_select: app.globalData.sc_array_select,
      yf: yf,
      types : options.types,
      pay_money: pay_money,
      money_all: money_all
    });
  }
})