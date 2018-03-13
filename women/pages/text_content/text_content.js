// pages/text_content/text_content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    id: 2,
    title: "软文，方法是“软“，精髓在”文",
    img_src: "/images/content/yf2.jpg",
    content: "然而，拨开层层有关软文的迷雾，最重要的还是那句话，“思路决定出路“，文笔和语言的表达是可以通过后天的勤奋学习锻炼出来的，然而一个清晰的思路才是保证出产优秀作品的基石，有了思路，才有目标、方法和技术等等这些必不可缺的软文要素。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    // 在这里通过id获取对应的数据
    this.setData({
      id: options.id
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})