// pages/details/details.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    bookId:''
  },
  onLoad: function (options) {
    this.setData({
      bookId : options.id
    })
    console.log(this.data.bookId)
    this.getData(options)
  },
  getData(options){
    fetch.get(`/book/${options.id}`).then(res => {
      console.log(res)
    })
  }
})