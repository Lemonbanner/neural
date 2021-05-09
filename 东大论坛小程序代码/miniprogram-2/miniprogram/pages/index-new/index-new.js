// pages/index-new/index-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航 数组
    catesList: [],
    list: [
      {
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

  getCateList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  onLoad: function (options) {
    wx.showTabBar({})
  }
})