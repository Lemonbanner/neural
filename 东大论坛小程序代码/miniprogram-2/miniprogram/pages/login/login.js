// pages/login/login.js
Page({

  data: {
    phonenumber: "",
    password: ""
  },

  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value;
    console.log(this.data.phonenumber)
  },

  passwordInput: function(e) {
    this.data.password = e.detail.value;
  },

  signin: function(e) {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
      success: function(res) {}
    })
  },
  regist: function() {
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    //校验用户的填写
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示!',
        content: '请输入手机号',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示!',
        content: '请输入密码',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.passwordack == '') {
      wx.showModal({
        title: '提示!',
        content: '请输入确认密码',
        showCancel: falser,
        success(res) {}
      })
    } else {
      //登录接口配置 

      console.log("success!")

      console.log(that.data.phonenumber)
      console.log(that.data.password)


      //校验手机号是否注册过
      db.collection('Users').where({
          // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
          telephone: that.data.phonenumber,
        })
        .get({
          success: function(res) {
            console.log(res.data.length)
            if (res.data.length == 0) {
              //已经注册过了
              wx.showModal({
                title: '提示',
                content: '该手机号未注册',
                showCancel: false,
                success(res) {}
              })
            } else {
              //校验密码是否输入正确
              console.log(res)
              console.log(that.data.password)
              console.log(res.data["0"].password)
              if (res.data["0"].password == that.data.password) {
                  //登录成功 user_id赋值全局变量
                 getApp().globalData.user_id=res.data["0"]._id;

                  wx.showModal({
                  title: '功能',
                  content: '登录成功！',
                  showCancel: false,
                  success(res) {},
                  complete: function(res) {
                    wx.reLaunch({
                      url: '/pages/square_biaobai/square_biaobai'
                    })
                  }
                })
              } else {
                wx.showModal({
                  title: '功能',
                  content: '密码不正确',
                  showCancel: false,
                  success(res) {},

                })
              }
            }
          }
        })


    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})