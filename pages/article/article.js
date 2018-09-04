// pages/article/article.js
import {fetch} from '../../utils/util.js'

Page({
  data: {
    article: {},
    isLoading: false
  },
  onLoad: function(options) {
    console.log(options)
    this.getData(options.id)
  },
  getData(url) {
    this.setData({
        isLoading: true
      }),
      fetch.get(`/article/${url}`).then(res => {
        this.setData({
          article: res.data,
          isLoading: false
        })
        console.log(this.data.article)
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
  }
})