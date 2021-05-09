// pages/chat/chat.js

import  {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js";
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '欢迎咨询商品信息！'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '你好！'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });

    
    // this.handleChooseAddress()

  },


  // async handleGetImage(){
  //   try {
  //     // 1 获取 权限状态
  //     const res1=await getSetting();
  //     const scopeAddress= res1.authSetting['scope.userInfo'];
  //     console.log()
  //     // 2 判断权限状态
  //     if(scopeAddress===false){
  //       // 3 用户以前拒绝过授予权限  提示用户打开授权页面
  //        await openSetting();
  //     }
  //     // 4 直接调用获取收货地址的API
  //     let address=await chooseAddress();
  //     address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
  //     // 存入缓存
  //     wx.setStorageSync("address", address);
  //    } catch (error) {
  //    console.log(error); 
  //  }
  // },
      
  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
