var app = getApp();
var url_list = require('../../config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    var commodity_id = event.currentTarget.dataset.id;
    //规格应该做成活动的，最后搞这个。
    var color = 'red22';
    var size = '11';
    var count = 1;
    app.addCart(commodity_id,color, size, count);
  },
  //去添加订单
  buy: function (event){
    //将sc_array_select弄成数组
    var sc_array_select = Array(
      this.data.commodity_data
    );
    app.globalData.sc_array_select = sc_array_select;
    //此处设置参数
    app.globalData.sc_array_select[0].color = 'red';
    app.globalData.sc_array_select[0].size = '30cm';
    app.globalData.sc_array_select[0].count = 1;
    //算出金额、运费、总金额、
    var money_now = Number(this.data.commodity_data.money_now);
    var count = Number(app.globalData.sc_array_select[0].count);
    var expressage = Number(this.data.commodity_data.expressage);
    var money_all = money_now * count + expressage;
    var pay_money = money_now * count;
    wx.navigateTo({
      url: '../payment/payment?money_all=' + money_all
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
        that.setData({
          commodity_data: result.data
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