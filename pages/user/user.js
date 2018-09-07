// pages/user/user.js
import {fetch,login} from '../../utils/util.js'
Page({

  data: {
    canIUse:false,
    user: {}
  },

  onLoad: function(options) {
    this.getSetting()
    console.log(this.data.canIUse)
  },

  getSetting(){
    let self = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
              self.setData({
                user: res.userInfo,
                canIUse:false
              })
            }
          })
        }else{
          self.setData({
            user: res.userInfo,
            canIUse: true
          })
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    this.setData({
      user: e.detail.userInfo,
      canIUse:false
    })
  },

  jumpCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    })
  },

  onShareAppMessage: function() {

  }
})