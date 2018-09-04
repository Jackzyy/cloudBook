//封装fetch,返回GET请求方法
const baseUrl = 'https://m.yaojunrong.com';

const fetch = {
  http (url, method, data){
    //返回一个new Promise对象
    return new Promise((resolve,reject) => {
      wx.request({
        url:baseUrl+url,
        data,
        method,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data){
    return this.http(url, 'GET', data)
  }
}
exports.fetch = fetch;