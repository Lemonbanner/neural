// pages/conmit_biaobai/commit_biaobai.js
const time = require("../../utils/util.js");//根据自己项目的位置而定
Page({

  /**
   * 页面的初始数据
   */
   data: {
    content:""
  },
  //文本
  bindtextAreaBlur:function(e){
    var that = this
    console.log(e.detail.value)

    that.content=e.detail.value

    console.log(that.content)
  },
  send:function(e){
    var that=this
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    console.log(getApp().globalData.user_id)
    db.collection('Message_lost').add({
      // data 字段表示需新增的 JSON 数据

      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        username:getApp().globalData.userInfo.nickName,
        message:that.content,
        publisher_id:getApp().globalData.user_id,
        timestamp:time.formatTime(Date.parse(new Date()), 'Y/M/D h:m:s'),
        face_url:getApp().globalData.userInfo.avatarUrl,
        total_likes:0,
        images: [""]
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                //发布成功
                wx.reLaunch({
                  url: '/pages/square_shiwu/square_shiwu' 
      // url: '/pages/enroll/enroll'//暂时修改一下
    })

                console.log(res)
                console.log(发布成功)
                wx.showToast({
                  title: '发布成功',
                  icon: 'success',
                  duration: 2000
                })

              }
            })

  },
  onLoad: function () {
    // // 调用函数时，传入new Date()参数，返回值是日期和时间
    // var time = util.formatTime(new Date());
    // // 再通过setData更改Page()里面的data，动态更新页面的数据
    // this.setData({
    //   time: time
    // });
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