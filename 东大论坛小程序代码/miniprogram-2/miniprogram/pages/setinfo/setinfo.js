// pages/setinfo/setinfo.js
var app = getApp()

wx.cloud.init({
  env: 'miao-4gffxlbce2352c3f'  //数据库ID
})
const db = wx.cloud.database({
  env: 'miao-4gffxlbce2352c3f'
})
Page({
  data: {
    myinfo:null,
    infoMess: '',
    userName: '',
    userN:'',
    passWd: '',
    passW:'',

    new_name:null,
    new_personal_signature:null,
    new_identity:null,
    new_department:null,
    new_age:null,
    new_password:null
  },
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    db.collection('Users').where({_id:app.globalData._id}).get({
      success:function(res){
        console.log(res.data[0])
        that.setData({
          myinfo:res.data[0],
          new_name:res.data[0].name,
          new_personal_signature:res.data[0].personal_signature,
          new_identity:res.data[0].identity,
          new_department:res.data[0].department,
          new_age:res.data[0].age,
          new_password:res.data[0].password
        })
        //console.log(that.data.myinfo)****用this就不对

      }
    })
    //console.log(this.data.myinfo.age)

  },
  //用户名和密码输入框事件
  userNameInput:function(e){
    this.setData({
      new_name:e.detail.value
    })
  },
  userSayInput:function(e){
    this.setData({
      new_personale_signature:e.detail.value
    })
  },
  userDepartmentInput:function(e){
    this.setData({
      new_department:e.detail.value
    })
  },
  userAgeInput:function(e){
    this.setData({
      new_age:e.detail.value
    })
  },
  passWdInput:function(e){
    this.setData({
      new_password:e.detail.value
    })
  },
  userIdentityInput:function(e){
    this.setData({
      new_identity:e.detail.value
    })
  },

  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick:function(){


    if(this.data.userN.length == 0 || this.data.passW.length == 0){
      this.setData({
        infoMess:'温馨提示：用户名和密码不能为空！',
      })
    }else{
      this.setData({
        infoMess:'',
        userName:'用户名：'+this.data.userN,
        passWd:'密码：'+this.data.passW
      })
    }
  },
  //重置按钮点击事件
  resetBtnClick:function(e){
    console.log(app.globalData._id)
    console.log(app.globalData.number)
    wx.cloud.callFunction({
      　　// 云函数名称【刚刚创建的云函数文件的名字】
         name: 'update_data',
         // 传给云函数的参数<br>　　 // dataId 为我要修改的 users 集合内数据的 _id ； lover 为要修改的内容
         data: {
            dataId:app.globalData._id,
            //lover: 'girl',
            age:this.data.new_age,
            name:this.data.new_name,
            identity:this.data.new_identity,
            department:this.data.new_department,
            password:this.data.new_password,
            personal_signature:this.data.new_personal_signature
          
         },
          success: function (res) {

            if (res.result.errMsg == 'document.update:ok'){
               console.log('调用成功')
             }
          },
          fail: console.error
       })
  },
})