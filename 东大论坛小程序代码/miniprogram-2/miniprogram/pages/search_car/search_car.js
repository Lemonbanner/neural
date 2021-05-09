// // pages/search/search.js
const db = wx.cloud.database(
  {env:'miao-4gffxlbce2352c3f'}
  );//初始化数据库
const p_collection= db.collection('Message_car')
// const pro_collection=db.collection('shoop');
// Page({
//   search:function(options){
//     pro_collection.count().then(res=>{
//       console.log("总量",res.total);
//     })
//   }
// })
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchVal: "",
    //搜索过后商品列表
    
    goodList:[],

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
          [image]: res.data[i].images[0],
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
  //  onLoad:function(options){
  //    p_collection.get().then(res=>{
  //      console.log(res)
  //    })
  //  }
})
