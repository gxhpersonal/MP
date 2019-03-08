import {
  config
} from '../config/config.js'

class http {
  constructor() {
    this.baseUrl = config.url;
    this.token = "";
    this.params = null;
  }
  setTempToken(token) {
    this.token = token
  }
  getToken() {
    if (this.token) {
      return this.token
    }
    return wx.getStorageSync("token")
  }
  // get 方法
  getRequest(obj) {
    return new Promise((resolve,reject) => {
      let reqParam = Object.assign({},{
        data: null,
        method: 'GET',
        header: {
          'token': this.getToken()
        },
        responseType: "",
        success: (res) => this.success(res,resolve),
        fail: (res) => this.fail(res,reject),
        complete: this.complete
      }, obj)
      reqParam.url = this.baseUrl + obj.url
      this.params = reqParam
      wx.request(reqParam)
    })
  }
  // post 方法
  postRequest(obj) {
    return new Promise((resolve, reject) =>{
      let reqParam = Object.assign({}, {
        data: null,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': this.getToken()
        },
        responseType: "",
        success: (res) => this.success(res, resolve),
        fail: (res) => this.fail(res, reject),
        complete: this.complete
      }, obj)
      reqParam.url = this.baseUrl + obj.url
      this.params = reqParam
      wx.request(reqParam)
    })
  }

  // put 方法
  putRequest(obj) {
    return new Promise((resolve, reject) => {
      let reqParam = Object.assign({}, {
        data: null,
        method: 'PUT',
        //dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': this.getToken()
        },
        responseType: "",
        success: (res) => this.success(res, resolve),
        fail: (res) => this.fail(res, reject),
        complete: this.complete
      }, obj)
      reqParam.url = this.baseUrl + obj.url
      this.params = reqParam
      wx.request(reqParam)
    })
  }

  deleteRequest(obj) {
    return new Promise((resolve, reject) => {
      let reqParam = Object.assign({}, {
        data: null,
        method: 'DELETE',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': this.getToken()
        },
        responseType: "",
        success: (res) => this.success(res, resolve),
        fail: (res) => this.fail(res, reject),
        complete: this.complete
      }, obj)
      reqParam.url = this.baseUrl + obj.url
      this.params = reqParam
      wx.request(reqParam)
    })
  }

  /**
   * 默认请求函数
   */
  success(res,resolve) {
    var code = res.statusCode.toString();
    var statusChar = code.charAt(0);
    if (statusChar == "2") {
      resolve(res.data)
    } else {
      if (code == "401") {
        this.refetch(params)
      }
      resolve(res.data)
    }
  }
  refetch(val) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(val);
    })
  }
  /**
   * 默认失败请求函数
   */
  fail(error,reject) {
    console.log(this.params.url + '接口失败了', '错误原因=' + error.message)
    reject(res)
    wx.hideLoading()
    wx.showToast({
      title: '接口请求失败！',
    })
    // wx.navigateTo({
    //   url: "/pages/index/index",
    // })
  }
  // 必定执行函数
  complete(res) {
    // console.log(res.data.status, 'resres')
    if (!res) {
      this.hideLoading()
      wx.showToast({
        title: '数据请求超时！',
      })
      // wx.navigateTo({
      //   url: '/pages/index/index',
      // })
      return
    }
    if (res.data && res.data.status == -2) {
      wx.removeStorageSync("token");
      wx.removeStorageSync("UserInfo");
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
    }
  }
}
export {
  http
}