// pages/information/information.js
var app=getApp()
wx.cloud.init({
  env: 'miao-4gffxlbce2352c3f'  //数据库ID
})
const db = wx.cloud.database({
  env: 'miao-4gffxlbce2352c3f'
})
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    myinfo:null
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('Users').where({_id:app.globalData._id}).get({
      success:function(res){
        that.setData({
          myinfo:res.data[0]
        })
      }
    })
    console.log(this.data.myinfo)

  },

  onQuery: function() {
    console.log('[][][] ')
    //const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Users').where({
      number: app.globalData.number
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },



  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('student');
          //页面跳转
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
resetpwd:function(e){
    var no=this.data.myinfo.no;
    wx.navigateTo({
      url: '../password/password?no=' + no,
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  }
})
