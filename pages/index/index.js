//导入封装后GET方法
import { fetch, login} from '../../utils/util.js'

//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrls: [],
    mainContent: [],
    title: '',
    pn: 1,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isLoading: false,
    hasMore:true
  },

  onLoad() {
    //等待态 pending
    this.getAll()
    //console.log(this.getAll())
    login()
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
        item.time = `${(timeDif / 1000).toFixed(1)}秒前`
      } else if (timeDif / 1000 / 60 / 60 < 1) {
        item.time = `${(timeDif / 1000 / 60).toFixed(1)}分钟前`
      } else if (timeDif / 1000 / 60 / 60 / 24 < 1) {
        item.time = `${(timeDif / 1000 / 60 / 60).toFixed(1)}小时前`
      } else {
        item.time = `${(timeDif / 1000 / 60 / 60 / 24).toFixed(1)}天前`
      }
    })
  },

  //轮播图数据请求
  getData() {
    return new Promise(resolve => {
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          imgUrls: res.data
        })
        // console.log(this.data.imgUrls)
      })
    })
  },

  //主体内容请求
  getContent() {
    return new Promise(resolve => {
      fetch.get('/category/books').then(res => {
        resolve(),
        this.setData({
          mainContent: res.data
        })
        // console.log(this.data.mainContent)
      })
    })
  },

  //获取全部请求
  getAll() {
    return new Promise(resolve => {
      this.setData({
        isLoading: true
      })
      Promise.all([this.getData(), this.getContent()]).then(() => {
        resolve(),
        // console.log('刷新成功')
        this.setData({
          isLoading: false
        })
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    this.getAll().then(() => {
      wx.stopPullDownRefresh()
      this.setData({
        hasMore:true,
        pn: 1
      })
    })
  },

  //上拉增加分类
  getMoreContent(){
    return fetch.get('/category/books',{pn:this.data.pn})
  },
  onReachBottom(){
    if(this.data.hasMore){
      this.setData({
        pn: ++ this.data.pn
      })
      // console.log(this.data.pn)
      this.getMoreContent().then(res => {
        // console.log(res.data)
        let newArr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: newArr
        })
        if(res.data.length < 2){
          this.setData({
            hasMore:false
          })
        }
      })
    }
  },
  //逻辑跳转
  jumpBook(event) {
    // console.log(event)
    const id = event.currentTarget.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }
})