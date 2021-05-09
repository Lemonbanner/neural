// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  biaobaiCommit:function(e){
    console.log('1')
    wx.reLaunch({
      url: '/pages/commit_biaobai/commit_biaobai'
    })
  },
  xiaoerCommit: function (e) {
    console.log('2')
    wx.reLaunch({
      url: '/pages/commit_xiaoer/commit_xiaoer'
    })
  },
  pincheCommit: function (e) {
    console.log('3')
    wx.reLaunch({
      url: '/pages/commit_pinche/commit_pinche'
    })
  },
  shiwuCommit: function (e) {
    console.log('4')
    wx.reLaunch({
      url: '/pages/commit_shiwu/commit_shiwu'
    })
  },
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
})