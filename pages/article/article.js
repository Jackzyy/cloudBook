// pages/article/article.js
import {fetch} from '../../utils/util.js'

Page({
  data: {
    titleId:'',
    article: {},
    fontsize: 40,
    bookId: '',
    catalog:[],
    index: '',
    isShow: false,
    isLoading: false
  },

  //目录跳转
  handleGet(e){
    // console.log(e)
    this.setData({
      isShow:!this.data.isShow,
      titleId:e.target.id
    })
    this.getData()
  },

  //isShow状态切换
  isShow(){
    // console.log(this.data.isShow)
    this.setData({
      isShow:!this.data.isShow
    })
  },

  // 点击设置字体大小
  changeSizeUp() {
    // console.log(this.data.fontsize)
    this.setData({
      fontsize: this.data.fontsize + 2
    })
  },
  changeSizeDown() {
    // console.log(this.data.fontsize)
    if (this.data.fontsize == 18) {
      wx.showModal({
        title: '字体太小哦',
        showCancel: false
      })
    } else {
      this.setData({
        fontsize: this.data.fontsize - 2
      })
    }
  },

  onLoad: function(options) {
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    })
    this.getData()
    this.getCatalog()
  },

  //上下页
  pageDown(){
    let catalog = this.data.catalog
    if (catalog[this.data.index + 1]){
      this.setData({
        index: ++this.data.index,
        titleId: catalog[this.data.index]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '到底了哦'
      })
    }
  },
  pageUp() {
    let catalog = this.data.catalog
    if (this.data.index - 1 < 0) {
      // console.log(this.data.index)
      wx.showToast({
        title: '已是第一章了哦'
      })
    } else {
      this.setData({
        index: --this.data.index,
        titleId: catalog[this.data.index]._id
      })
      this.getData()
    }
  },

  //获取目录
  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data
      })
      // console.log('catalog_res', this.data.catalog)
    })
  },

  //获取文章
  getData() {
    this.setData({
        isLoading: true
      }),
      fetch.get(`/article/${this.data.titleId}`).then(res => {
        // console.log(res)
        this.setData({
          article: res.data,
          index: res.data.article.index,
          isLoading: false
        })
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
  }
})