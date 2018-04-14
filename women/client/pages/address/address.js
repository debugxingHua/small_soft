var url_list = require('../../config.js');
var app = getApp();
Page({
  data: {
    showModalStatus: false,
    hasAddress:false,
    click_types:'无'
  },
  //从订单页点进来选择地址
  selectedIndex:function(event){
    if (this.data.click_types == "buy") {
      var index = event.currentTarget.dataset.index;
      //获得这个地址，返回去
      var address = this.data.addressList[index];
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        address: address
      });
      wx.navigateBack({
        delta: 1
      })
    } 
  },
  toAddAddress: function (e) {
    this.setData({
        showModalStatus: true
    });
  },
  addAddress: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var postcode = e.detail.value.postcode;
    var address = e.detail.value.address;
    console.log(phone.length);
    if (name == '' || phone == '' || postcode == '' || address == ''){
      wx.showToast({
        title: '信息不完整',
        icon:'none',
        duration: 1000
      })
      return false;
    }
    if(phone.length != 11 || isNaN(phone)){
      wx.showToast({
        title: '正确填写手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (isNaN(postcode)) {
      wx.showToast({
        title: '邮编只能为数字',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //地址存入数据库
    wx.request({
      url: url_list.url_list.addAddress,
      data:{
        'user_id':app.globalData.user_id,
        'name':name,
        'phone': phone,
        'postcode': postcode,
        'address': address,
      },
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        // console.log(res);
        if(res.data != "0"){
          wx.showToast({
            title: '成功',
            icon: 'success',
          })
          that.setData({
            showModalStatus: false
          });
        }
        //重新加载地址页面并获取地址信息
        app.getAddressListByUserId(that);
      }
    })
  },
  formReset: function () {
    this.setData({
      showModalStatus:false
    });
  },
  onShow:function(options){
    var that = this;
    app.getAddressListByUserId(that);
  },
  onLoad:function(options){
    var that = this;   
    if (typeof (options.click_types) == 'undefined'){
      // console.log('undefined');
    }else{
      // console.log(options.click_types);
      that.setData({
        click_types: options.click_types
      });
    }
  }
})
