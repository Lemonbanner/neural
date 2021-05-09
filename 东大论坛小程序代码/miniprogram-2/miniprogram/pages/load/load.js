Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  next:function(e){
    console.log("userInfo", getApp().globalData.userInfo);
    wx.reLaunch({
    
      url: '/pages/login/login' 
      // url: '/pages/enroll/enroll'//暂时修改一下
    })
  },

  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success(res) {
        if (res.code) {
          // 查看是否授权
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    console.log(res.userInfo);
                    getApp().globalData.userInfo = res.userInfo;
                    that.next();
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    setTimeout(function(){
      wx.hideLoading()
    },100)
  },
  bindGetUserInfo(e) {
    if (e.userInfo==undefined){

    }else{
      getApp().globalData.userInfo = e.userInfo;
      this.next();
    }
  }
})