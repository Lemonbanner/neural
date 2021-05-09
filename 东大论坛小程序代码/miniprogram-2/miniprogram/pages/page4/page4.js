// pages/page4/page4.js
var app = getApp() 
wx.cloud.init({
  env: 'miao-4gffxlbce2352c3f'  //数据库ID
})
const db = wx.cloud.database({
  env: 'miao-4gffxlbce2352c3f'
})
Page({
  data: {
    userInfo: {},
    userN: '',
    passW: ''
  },
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  passWordInput: function (e) {
    this.setData({
      passW: e.detail.value
    })
  },
 loginBtnClick: function (a) {
    var that = this
    if (this.data.userN.length == 0 || this.data.passW.length == 0) {
      wx.showModal({
        title: '温馨提示：',
        content:'用户名或密码不能为空！',
        showCancel:false
      })
    } else {
      
      db.collection('Users').where({telephone:that.data.userN}).get({
        success:function(res){
 
          if (that.data.passW == res.data[0].password){
            app.globalData.number=that.data.userN;
            app.globalData._id=res.data[0]._id,
            app.globalData.open_id=res.data[0].open_id
            console.log(res.data[0].open_id)
            console.log(res.data[0]._id)

            
            wx.switchTab({
              url: '/pages/index/index',
            })

            /*wx.showModal({
              title: '成功登陆',
              content: '成功登陆'//session中用户名和密码不为空触发
            });*/
            
            /*wx.redirectTo({
              
               url: '/pages/index/index'//[主页面]
            })*/ 

          
             

            
          }
          else{
            wx.showModal({
              title: '密码错误',
              content: '密码错误'//session中用户名和密码不为空触发
            });
          }
         }
      })
    }
  }
})
