// miniprogram/pages/page3/page3.js
var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '个人资料', url: '/pages/information/information', icon: '/images/user/user1.png', tips: '', arrows: '/images/user/arrows.png' },
      { text: '我的交流', url: '/pages/my_square_biaobai/my_square_biaobai', icon: '/images/user/user3.png', tips: '', arrows: '/images/user/arrows.png' },
      { text: '设置我的', url: '/pages/setinfo/setinfo', icon: '/images/user/user5.png', tips: '', arrows: '/images/user/arrows.png' },
      { text: '退出登录', url: '#', icon: '/images/user/user4.png', tips: '', arrows: '/images/user/arrows.png' }

    
    ],

   

 
     
      
    
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
},
toLogin(e){
  wx.navigateTo({ url: '/pages/page4/page4' }) 
}

})