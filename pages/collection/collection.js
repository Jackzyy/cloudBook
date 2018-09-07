// pages/collection/collection.js
import { fetch} from '../../utils/util.js'

Page({

  data: {
    collection:[]
  },

  onLoad: function (options) {
    this.collection()
  },

  //获取收藏过的书籍
  collection() {
    fetch.get('/collection').then(res => {
      this.setData({
        collection:res.data
      })
      // console.log(this.data.collection)
    })
  },

  //删除收藏
  delCollection(e) {
    // console.log(e)
    let id = e.currentTarget.id
    fetch.delete(`/collection/${id}`).then(res => {
      // console.log(res)
      this.collection()
    }).catch(err => {
      console.log(err)
    })
  },

  //逻辑跳转
  jumpBook(event) {
    // console.log(event)
    const id = event.currentTarget.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },

  onShareAppMessage: function () {
  
  }
})