// pages/catalog/catalog.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    catalog: [],
    isLoading: false
  },
  onLoad: function (options) {
    // console.log(options)
    this.getData(options.id)
  },
  getData(id){
    this.setData({
      isLoading: true
    }),
    fetch.get(`/titles/${id}`).then(res => {
      this.setData({
        catalog: res.data,
        isLoading: false
      })
      console.log(this.data.catalog)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  jumpArticle(e){
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`
    })
  }
})