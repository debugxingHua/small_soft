var app = getApp();
var url_list = require('../../config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    footer:true,
    count_value:1,
    lookImg: false,
    suoyin:1
  },
  //看图片
  lookImg:function(e){
    var url = e.currentTarget.dataset.url;
    this.setData({
      lookImg:true,
      look_img_url:url
    });
  },
  hiddenImg:function(e){
    this.setData({
      lookImg: false
    });
  },
  addFavorite:function(e){
    var commodity_id = e.currentTarget.dataset.id;
    wx.request({
      url: url_list.url_list.addFavorite,
      data:{
        commodity_id: commodity_id,
        user_id: app.globalData.user_id
      },
      success:function(res){
        if(res.data){
          wx.showToast({
            title: res.data.errMsg,
          })
        }
      }
    })
  },
  count_vlue_change:function(e){
    this.setData({
      count_value: e.detail.value
    });
  },
  count_jian:function(e){
    var count = Number(this.data.count_value);
    if(count >= 2){
      count--;
      this.setData({
        count_value:count
      });
    }
  },
  count_jia: function (e) {
    var count = Number(this.data.count_value);
    count++;
    this.setData({
      count_value: count
    });
  },
  radioSizeChange: function (e) {
    this.setData({
      size_selected: e.detail.value
    });
  },
  radioColorChange: function (e) {
    this.setData({
      color_selected: e.detail.value
    });
  },
  CountChange: function (e) {
    this.setData({
      count_value: e.detail.value
    });
  },
  setParamFalse:function(e){
    this.setData({
      footer:true
    });
  },
  tosy: function (event){
    wx.switchTab({
      url: '../index/index',
    })
  },
  toCart: function (event){
    wx.switchTab({
      url: '../shopcar/shopcar',
    })
  },
  addCart:function(event){
    this.setData({
      footer: true
    });
    var commodity_id = event.currentTarget.dataset.id;
    var color = this.data.color_selected;
    var size = this.data.size_selected;
    var count = this.data.count_value;
    app.addCart(commodity_id,color, size, count);
  },
  toAddCartOrBuy: function (event) {
    var that = this;
    that.setData({
      footer:false
    });
  },
  //去添加订单
  buy: function (event){
    //将sc_array_select弄成数组
    var sc_array_select = Array(
      this.data.commodity_data
    );
    app.globalData.sc_array_select = sc_array_select;
    //此处设置参数
    app.globalData.sc_array_select[0].color = this.data.color_selected;
    app.globalData.sc_array_select[0].size = this.data.size_selected;
    app.globalData.sc_array_select[0].count = this.data.count_value;
    //算出金额、运费、总金额、
    var money_now = Number(this.data.commodity_data.money_now);
    var count = Number(app.globalData.sc_array_select[0].count);
    var expressage = Number(this.data.commodity_data.expressage);
    var money_all = money_now * count + expressage;
    var pay_money = money_now * count;
    wx.navigateTo({
      url: '../payment/payment?money_all=' + money_all+'&types=buy'
    }) 
  },
  /**
 * 生命周期函数--监听页面加载
 */ 
  onLoad: function (options) {
    var that = this;
    var commodity_id = options.id;

    // 根据id获取商品
    wx.request({
      url: url_list.url_list.getCommodityById,
      data: {
        commodity_id: commodity_id
      },
      method: 'GET',
      success: function (result) {
        result.data.size = result.data.size.split(',');
        result.data.color = result.data.color.split(',');
        that.setData({
          commodity_data: result.data,
          size_selected: result.data.size[0],
          color_selected: result.data.color[0]
        });
      }
    });
    // 根据id获取图片
    wx.request({
      url: url_list.url_list.getCommodityImgById,
      data: {
        commodity_id: commodity_id
      },
      method: 'GET',
      success: function (result) {
        // console.info(result);
        that.setData({
          swiper_img: result.data
        });
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '女人的衣柜',
      path: '/pages/shop_content/shop_content?commodity_id=' + app.globalData.commodity.commodity_id,
      success: function (shareTickets) {
        console.info(shareTickets+'成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res+'失败');
        // 转发失败
      }
    }
  }
})