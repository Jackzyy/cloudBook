// pages/details/details.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    bookId:'',
    bookData: {},
    Chapters:'',
    token:'',
    isCollect:'',
    isLoading: false
  },

  onLoad: function (options) {
    this.setData({
      bookId : options.id
    })
    // console.log(this.data.bookId)
    this.getData(options)
    this.Chapters()
    // this.getToken()
  },

  //添加收藏
  isCollection(){
    this.setData({
      isCollect:1
    })
    fetch.post('/collection', {bookId:this.data.bookId}).then(res => {
      console.log(res)
    })
  },


  //获得章数
  Chapters(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      // console.log('AAAA',res)
      this.setData({
        Chapters: res.data.length
      })
    })
  },

  getData(options){
    this.setData({
      isLoading: true
    }),
    fetch.get(`/book/${options.id}`).then(res => {
      console.log(res)
      this.setData({
        bookData: res.data,
        isLoading: false,
        isCollect: res.isCollect
      })
      // console.log(this.data.isCollect)
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
  },


  onShareAppMessage: function (res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.bookData.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.img
    }
  }
})