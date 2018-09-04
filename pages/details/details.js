// pages/details/details.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    bookId:'',
    bookData: {},
    isLoading: false
  },

  onLoad: function (options) {
    this.setData({
      bookId : options.id
    })
    // console.log(this.data.bookId)
    this.getData(options)
  },
  
  getData(options){
    this.setData({
      isLoading: true
    }),
    fetch.get(`/book/${options.id}`).then(res => {
      this.setData({
        bookData: res.data,
        isLoading: false
      })
      // console.log(this.data.bookData)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },

  //逻辑跳转Book目录
  jumpBook(e) {
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}`
    })
  }
})