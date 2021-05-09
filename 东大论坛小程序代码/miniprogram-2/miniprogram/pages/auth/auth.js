// pages/afford/afford.js

import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime";
import  {login} from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


// 获取用户信息
  async handleGetUserInfo(e){
    try{
    // console.log(e)
    // 1 获取用户信息
    const{encryptedData,rawData,iv,signature}=e.detail;
    // 2 获取小程序登录成功后的code
    const {code}=await login();
    const loginParams={encryptedData,rawData,iv,signature,code}
    // 3 发送请求 获取用户token
    const token=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin",
    data:loginParams,method:"post"});
    // 因为不是企业账号  这一步我们是无法实现的
    console.log(token)
    // 4 若成功获取到token 则把token存入缓存，同时跳转回上一个页面
    wx.wx.setStorageSync("token", token);
    wx.wx.navigateBack({
      delta: 1
    });
  } catch (error) {
    console.log(error);
    }
  }
  })