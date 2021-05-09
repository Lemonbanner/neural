// pages/enroll/enroll.js
const db = wx.cloud.database(
  {env:'miao-4gffxlbce2352c3f'}
  )
const carCollection = db.collection('Users')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    password: "",
    passwordack: ""
  },
  addData: function(event) {
    db.collection('Message_car').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        image: "learn cloud database",
        message: "5月10号早上六点去南湖",
        anonymous_or_not: false,
        publisher_id: 113,

        // 为待办事项添加一个地理位置（113°E，23°N）
        location: new db.Geo.Point(113, 23),
        done: false
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  usernameInput: function(e) {
    this.data.username = e.detail.value;
    console.log(this.data.username)
  },
  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value;
  },
  passwordInput: function(e) {
    this.data.password = e.detail.value;
  },
  passwordInputAck: function(e) {
    this.data.passwordack = e.detail.value;
  },
  signin: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  regist: function() {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    // //测试数据库
    // db.collection('Message_car').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了

    //     message: "5月10号早上六点去南湖",
    //     anonymous_or_not: false,
    //     publisher_id: 113,

    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // })








    //校验用户的填写

    if (that.data.username == '') {
      wx.showModal({
        title: '提示!',
        content: '请输入用户名',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示!',
        content: '请输入手机号',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示!',
        content: '手机号格式不正确',
        showCancel: false,
        success(res) {}
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示!',
        content: '请输入正确的手机号码',
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
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.passwordack != that.data.password) {
      wx.showModal({
        title: '提示!',
        content: '两次密码输入不一致',
        showCancel: false,
        success(res) {}
      })
    } else {
      console.log("success!")
      console.log(that.data.username)
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
            if (res.data.length != 0) {
              //已经注册过了
              wx.showModal({
                title: '提示',
                content: '该手机号已被注册',
                showCancel: false,
                success(res) {}
              })
            } else {
              //新增一条用户记录数据库
              db.collection('Users').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了

                  name: that.data.username,
                  password: (that.data.password),
                  telephone: that.data.phonenumber,

                },
                success: function(res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log(res)
                  getApp().globalData.user_id=res._id;
                  console.log(res._id)
                  console.log(getApp().globalData.user_id)
                  wx.showModal({
                    title: '功能',
                    content: '恭喜注册成功！',
                    showCancel: false,
                    success(res) {},
                    complete: function(res) {
                      //将这个用用户的id传给user全局变量。

                      wx.reLaunch({
                        url: '/pages/square_biaobai/square_biaobai'
                      })
                    }
                  })
                }
              })
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