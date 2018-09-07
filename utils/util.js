//封装fetch,返回GET请求方法
const baseUrl = 'https://m.yaojunrong.com';

const fetch = {
  http(url, method, data) {
    //返回一个new Promise对象
    return new Promise((resolve, reject) => {

      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if(token) {
        //??????
        header.token = token
      }

      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success: function(res) {
          // console.log(res.header.Token)
          resolve(res.data)
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'GET', data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  },
  delete(url, data) {
    return this.http(url, 'DELETE', data)
  }
}

const login = () => {
  wx.login({
    success: function(res) {
      fetch.post('/login', {
        code: res.code,
        appid: "wxb0b7e6327b983a65",
        secret: "07fe1f8feff526d40d0f1560267f48e5"
      }).then(res => {
        console.log(res)
      })
    }
  })
}

exports.login = login;
exports.fetch = fetch;
