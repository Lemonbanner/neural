// pages/index-new/index-new.js
const time = require("../../utils/util.js");//根据自己项目的位置而定
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifchoose:0,
    contentRe: "" ,
    likenum:0,
    showData:{},
    showCommentData:{},
    // 导航 数组
    list2: {},
    color1: "#979797",
    color2: "#000000",
    color3: "#000000",
    color4: "#000000",
    searchVal: "",
    //搜索过后商品列表
    comment_txt:"",
    reply_id:"",
    reply_name:"",
    wall_love_id:"",
    reply_message:"",
    currentID:'',
    focus: false,
    focus2: false,
    userID:"",
    goodList:[],
    catesList: [],
    list: [{
        face_url: "/images/add.png",
        username: "哆啦B梦",
        send_time: "2019-7-6 11:11:11",
        content: "asadshfjdaljfkdlakfldalf",
        total_likes: 99
      },
      {
        face_url: "/images/nice.png",
        username: "哆啦C梦",
        send_time: "2019-7-6 11:11:11",
        content: "asadshfjdaljfkdlakfldalf",
        total_likes: 99
      },
      {
        face_url: "/images/nice_true.png",
        username: "哆啦D梦",
        send_time: "2019-7-6 11:11:11",
        content: "asadshfjdaljfkdlakfldalf",
        total_likes: 99
      },
      {
        face_url: "/images/nice.png",
        username: "哆啦C梦",
        send_time: "2019-7-6 11:11:11",
        content: "asadshfjdaljfkdlakfldalf",
        total_likes: 99
      },
      {
        face_url: "/images/nice_true.png",
        username: "哆啦D梦",
        send_time: "2019-7-6 11:11:11",
        content: "asadshfjdaljfkdlakfldalf",
        total_likes: 99
      }
    ]
  },
  like(e){
    var that=this
     const like_num=e.currentTarget.dataset.like_num+1
     const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
     db.collection('LikeList').add({
      // data 字段表示需新增的 JSON 数据

      data: {
        username:getApp().globalData.userInfo.nickName,
        be_liked_message:e.currentTarget.dataset.message,
        face_url:getApp().globalData.userInfo.avatarUrl,
        be_liked_id:e.currentTarget.dataset.publisher_id,
        
  },
  success: function (res) {
    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        /*     //发布成功
            wx.reLaunch({
              url: '/pages/square_biaobai/square_biaobai' 
  
}) */}
  })
     // update 更新操作
    // primary key 要更新的那条数据的主键id
  
    db.collection('Wall_love').doc(e.currentTarget.dataset.wall_id)
    .update({
      // 想要更新后的数据
      data: {
        total_likes: like_num
      }
    }).then(res => {
      // 更新数据成功
      console.log(res)
      that.onLoad();
      this.setData({
        total_likes: like_num
      })
    }).catch(err => {
      // 更新数据失败
      console.log(err)
    })
    
  },
  contentInputRe(e) { //当输入框的值发生改变时，获取
    var that=this
    
      that.contentRe=e.detail.value
    
    console.log(e.detail.value)
  },
  contentInput(e) { //当输入框的值发生改变时，获取
    var that=this
    that.comment_txt=e.detail.value
    that.focus=true 
    console.log(e.detail.value)
  },
  bindReply(e) {
    var that=this
    that.focus2=true 
    var id=e.currentTarget.dataset._id
    that.userID=e.currentTarget.dataset.reply_id,
  
    that.reply_name=e.currentTarget.dataset.reply_name,
    that.wall_love_id=e.currentTarget.dataset.wall_love_id,
    that.reply_message=e.currentTarget.dataset.reply_message,
    that.currentID=e.currentTarget.dataset._id,
    this.setData({
      'currentID': id,
      ifchoose:1,
      focus2:true
    })
   
  },
  //发送回复
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
        comment:that.contentRe,
        face_url:getApp().globalData.userInfo.avatarUrl,
        reply_to:that.reply_name,
        reply_to_id:that.userID,
        reply_to_message:that.reply_message,
        reply_to_wall_id:that.wall_love_id
  },
  success: function (res) {
    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            //发布成功
            that.onLoad();  
          }
  })
 
  }, 
//发送评论
 comment(e){
    var that=this
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    console.log(getApp().globalData.user_id)
    db.collection('CommentList').add({
      // data 字段表示需新增的 JSON 数据

      data: {
        userID:getApp().globalData.user_id,
        username:getApp().globalData.userInfo.nickName,
        comment:that.comment_txt,
        face_url:getApp().globalData.userInfo.avatarUrl,
        becommented_id:e.currentTarget.dataset.publisher_id,
        wall_love_id:e.currentTarget.dataset.wall_id,
        wall_love_message:e.currentTarget.dataset.wall_message
  },
success: function (res) {
  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          //发布成功
          that.onLoad();  
        }
  })
  
  }, 
searchtap:function(e){
    console.log("search")
    wx.navigateTo({
    url: '/pages/search_wall_love/search_wall_love',
  })
  },
  input(e) {
    this.setData({
      searchVal: e.detail.value
    })
    console.log(e.detail.value)
  },
  clear: function () {
    this.setData({
      searchVal: ""
    })
  },
  //商品关键字模糊搜索
  search: function () {
    var that=this
    wx: wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { 
        wx.hideLoading();
        console.log("失败");
      },
      complete: function (res) { },
    })
    //重新给数组赋值为空
    that.setData({
      'goodList': []
    })
    // 数据库正则对象
    //const _ = db.command
    p_collection.where({
      message: db.RegExp({
        regexp: that.data.searchVal,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    })
    .get().then(res => {
      console.log(res.data)
      if( res.data.length<1){
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示：',
          content:'没有找到您要搜索的内容哦',
          showCancel:false
        })
      }
      for (var i = 0; i < res.data.length; i++) {
        var title = "goodList[" + i + "].title"
        var id = "goodList[" + i + "].id"
        var image = "goodList[" + i + "].image"
        var time = "goodList[" + i + "].time"
       // var rmb = "goodList[" + i + "].rmb"
       // var content = "goodList["+ i +"].content"
       that.setData({
        [title]: res.data[i].message,
        [id]: res.data[i]._id,
        [image]: res.data[i].image[0],
        [time]:res.data[i].timestamp,
         // [rmb]: res.data[i].price,
         //[content]: res.data[i].description,
       })
       console.log(that.data.goodList[i].content)
       wx.hideLoading();
     }
   }).catch(err => {
    console.error(err)
    wx.hideLoading();
  })
 },
 navigateToDetail:function(event){
  wx.navigateTo({
    url: '../page1/page1',
  })
},
  getCateList() {
    request({
        url: "/home/catitems"
      })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  // select1: function(e) {
  //   wx.reLaunch({
  //     url: '/pages/square_biaobai/square_biaobai',
  //   })
  // },
  select2: function(e) {
    wx.reLaunch({
      url: "/pages/square_xiaoer/square_xiaoer",
    })
  },
  select3: function (e) {
    wx.reLaunch({
      url: "/pages/square_pinche/square_pinche",
    })
  },
  select4: function(e) {
    console.log(this.list2)
    wx.reLaunch({
      url: "/pages/square_shiwu/square_shiwu",
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database(
      {env:'miao-4gffxlbce2352c3f'}
      )
    db.collection('Wall_love').orderBy('timestamp', 'desc').get({
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
      
        console.log("222")
      },
      failed(res) {
        wx.showModal({
          title: '提示',
          content: '网络好像开小差了',
          showCancel: false,

        })
      }
    })
    db.collection('CommentList').orderBy('timestamp', 'desc').get({
      success: function(res) {
        // res.data 包含该记录的数据   
        console.log(res)
        console.log(res.data)
        that.setData({
          showCommentData : res.data
        })


        console.log(that.data.showCommentData)
      },
      complete: function(res) {
      
        console.log("222")
      },
      failed(res) {
        wx.showModal({
          title: '提示',
          content: '网络好像开小差了',
          showCancel: false,

        })
      }
    })

    db.collection('Reply').orderBy('timestamp', 'desc').get({
      success: function(res) {
        // res.data 包含该记录的数据   
        console.log(res)
        console.log(res.data)
        that.setData({
          showCommentReData : res.data
        })


        console.log(that.data.showCommentReData)
      },
      complete: function(res) {
      
        console.log("1122")
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



})