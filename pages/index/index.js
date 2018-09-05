//导入封装后GET方法
import {fetch} from '../../utils/util.js'
import Component from '../../wemark/wemark.js'

//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrls: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isLoading: false
  },
  onLoad() {
    this.getData(),
      this.getContent()
  },

  //轮播图数据请求
  getData() {
    this.setData({
      isLoading: true
    }),
    fetch.get('/swiper').then(res => {
      this.setData({
        imgUrls: res.data,
        isLoading: false
      })
      // console.log(this.data.imgUrls)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },

  //主体内容请求
  getContent() {
    fetch.get('/category/books').then(res => {
      this.setData({
        mainContent: res.data
      })
      // console.log(this.data.mainContent)
    })
  },
  //逻辑跳转
  jumpBook(event) {
    const id = event.currentTarget.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }
})