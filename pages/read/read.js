// pages/read/read.js
import {
  fetch
} from '../../utils/util.js'
Page({
  data: {
    bookData: [],
    bookId: '',
    isLogin: false,
    isLoading: false
  },

  onLoad: function(options) {
    this.getReadBook()
    
  },

  //查看是否登录
  checkSession() {
    return new Promise((resolve,reject) => {
      wx.checkSession({
        success: function () {
          // console.log('session_key 未过期')
          //session_key 未过期，并且在本生命周期一直有效
          resolve(true)
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          // console.log('session_key 过期')
          reject(false)
        }
      })
    }) 
  },

  //登录态的处理
  Login(){
    this.checkSession().then(res => {
      this.setData({
        isLogin:true
      })
    }).catch(err => {
      this.setData({
        isLogin: false
      })
      wx.showToast({
        title: '看官还未登录哦',
        icon: 'none'
      })
    }) 
  },

  //计算百分比方法
  percent(arr) {
    arr.forEach(item => {
      // console.log(item)
      item.percent = item.title.index / item.title.total * 100
      item.percent = item.percent.toFixed(0)
    })
  },

  //计算时间差
  timeD(arr) {
    arr.forEach(item => {
      // console.log(item)
      let upTime = Date.parse(item.updatedTime)
      let newDate = Date.parse(new Date())
      //获得时间戳
      let timeDif = newDate - upTime
      if (timeDif / 1000 < 1) {
        item.time = `${timeDif}毫秒前`
      } else if (timeDif / 1000 / 60 < 1) {
        item.time = `${(timeDif / 1000).toFixed(0)}秒前`
      } else if (timeDif / 1000 / 60 / 60 < 1) {
        item.time = `${(timeDif / 1000 / 60).toFixed(0)}分钟前`
      } else if (timeDif / 1000 / 60 / 60 / 24 < 1) {
        item.time = `${(timeDif / 1000 / 60 / 60).toFixed(0)}小时前`
      } else {
        item.time = `${(timeDif / 1000 / 60 / 60 / 24).toFixed(0)}天前`
      }
    })
  },

  //获取阅读过得图书
  getReadBook() {
    this.setData({
      isLoading: true
    })
    fetch.get('/readList').then(res => {
      this.Login()
      this.percent(res.data)
      this.timeD(res.data)
      this.setData({
        bookData: res.data,
        isLoading: false
      })
      console.log(this.data.bookData)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    this.getReadBook()
    wx.stopPullDownRefresh()
  },

  //跳转到上次阅读文章
  jumpArticle(e) {
    console.log(e)
    this.setData({
      bookId: e.currentTarget.dataset.bookid
    })
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}&bookId=${this.data.bookId}`
    })
  },

  //跳转到文章详情描述
  jumpBook(event) {
    // console.log(event)
    const id = event.currentTarget.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },

  //分享
  onShareAppMessage: function() {

  }
})