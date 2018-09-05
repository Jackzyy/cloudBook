// pages/catalog/catalog.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    catalog: [],
    bookId: '',
    isLoading: false
  },
  onLoad: function (options) {
    this.getData(options.id)
    // console.log('bookId:',this.data.bookId)
  },
  getData(id){
    this.setData({
      bookId : id,
      isLoading: true
    }),
    fetch.get(`/titles/${id}`).then(res => {
      this.setData({
        catalog: res.data,
        isLoading: false
      })
      // console.log(this.data.catalog)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  jumpArticle(e){
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}&bookId=${this.data.bookId}`
    })
  }
})