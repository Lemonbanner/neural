// miniprogram/pages/messgae/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    content: '' ,
    showData:{},
    showReData:{},
    showLikeData:{},
    focus: false,
    reply_id:"",
    reply_name:"",
    wall_love_id:"",
    reply_message:"",
    currentID:''
  },
  bindReply(e) {
      var that=this
      var id=e.currentTarget.dataset._id
      that.focus=true,
      that.reply_id=e.currentTarget.dataset.reply_id,
      that.reply_name=e.currentTarget.dataset.reply_name,
      that.wall_love_id=e.currentTarget.dataset.wall_love_id,
      that.reply_message=e.currentTarget.dataset.reply_message,
      that.currentID=e.currentTarget.dataset._id,
      this.setData({
        'currentID': id
      })
      //=================================================

  },
  contentInput(e) { //当输入框的值发生改变时，获取
    var that=this
    that.content=e.detail.value
    console.log(e.detail.value)
  },

  reply(e){
    var that=this
  
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    console.log(getApp().globalData.user_id)
    db.collection('Reply').add({
      // data 字段表示需新增的 JSON 数据

      data: {
        userID:getApp().globalData.user_id,
        username:getApp().globalData.userInfo.nickName,
        comment:that.content,
        face_url:getApp().globalData.userInfo.avatarUrl,
        reply_to:that.reply_name,
        reply_to_id:that.reply_id,
        reply_to_message:that.reply_message,
        reply_to_wall_id:that.wall_love_id
  },
  success: function (res) {
    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            //发布成功
            wx.reLaunch({
              url: '/pages/message/message' 
  // url: '/pages/Senroll/enroll'//暂时修改一下
})} 
  })
  },
  clickTab:function(e){
    var that=this;
    that.onLoad();
  var current = e.currentTarget.dataset.current;
  this.setData({currentTab:current})
  },

  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    db.collection('CommentList').where({becommented_id:getApp().globalData.user_id}).get({
       success: function(res) {
        // res.data 包含该记录的数据   
        console.log(res)
        console.log(res.data)
        that.setData({
          showData : res.data
        })


        console.log(that.data.showData)
      },
      complete: function(res) {
      },
      failed(res) {
        wx.showModal({
          title: '提示',
          content: '网络好像开小差了',
          showCancel: false,

        })
      }
    })
    db.collection('LikeList').where({be_liked_id:getApp().globalData.user_id}).get({
      success: function(res) {
        // res.data 包含该记录的数据   
        console.log(res)
        console.log(res.data)
        that.setData({
          showLikeData : res.data
        })


        console.log(that.data.showLikeData)
      },
      complete: function(res) {
      },
      failed(res) {
        wx.showModal({
          title: '提示',
          content: '网络好像开小差了',
          showCancel: false,

        })
      }
    })
    db.collection('Reply').where({reply_to_id:getApp().globalData.user_id}).get({
      success: function(res) {
        // res.data 包含该记录的数据   
        console.log(res)
        console.log(res.data)
        that.setData({
          showReData : res.data
        })


        console.log(that.data.showReData)
      },
      complete: function(res) {
      },
      failed(res) {
        wx.showModal({
          title: '提示',
          content: '网络好像开小差了',
          showCancel: false,

        })
      }
    })
    // console.log(that.list2.data)

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