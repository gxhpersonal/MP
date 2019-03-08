import {
  homeApi
} from "../../common/api/homeApi.js"
let Api = new homeApi()
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    code: "",
    timeTic: 0,
    sending: null,
    showProtocol: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  //手机号
  inputMobile: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 验证码
  inputCode: function(e) {
    console.log(e.detail.value, 'code')
    this.setData({
      code: e.detail.value
    })
  },
  login: function(e) {
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showModal({
        title: '登录提示!',
        content: '请允许授权,否则无法登录!',
        showCancel: false
      })
      return false
    }
    let avatar = e.detail.userInfo.avatarUrl
    let nickname = e.detail.userInfo.nickName
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          let data = {
            mobile: that.data.mobile,
            code: that.data.code,
            uis: "microapp",
            src: "microapp",
            wxcode: res.code,
            avatar: avatar,
            nickname: nickname,
          }
          if (!that.data.mobile || !that.data.code) {
            wx.showToast({
              icon: 'none',
              title: '请输入手机号码和验证码!',
            })
            return
          }
          wx.showLoading({
            title: '登录中',
          })
          Api.login(data, (res) => {
            if (res.status != 1) {
              wx.showToast({
                icon: 'none',
                title: res.message,
              })
            } else {
              wx.setStorageSync("UserInfo", res.data.UserInfo)
              wx.setStorageSync("token", res.data.Token)
              var pages = getCurrentPages()
              var prePage = pages[pages.length - 2]
              let jp = wx.getStorageSync('loginLump')
              let shareId = wx.getStorageSync('shareTicketId')
              let t = wx.getStorageSync('token')
              console.log(jp, shareId, t, '登录存')
              if (jp && shareId) {
                wx.navigateTo({
                  url: '/pages/ticket/shareTicket/shareTicket?ticketId=' + shareId,
                })
                return
              }
              if (prePage && prePage != "undefined") {
                wx.navigateBack({
                  delda: 2
                })
              } else {
                wx.switchTab({
                  url: '/pages/user/user',
                })
              }
              wx.hideLoading()
            }
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '登录失败！',
            icon: 'none',
            duration: 1000
          })
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 获取验证码
  getIdCode: function() {
    if (this.data.mobile == "") {
      wx.showToast({
        icon: 'none',
        title: '请填写手机号',
      })
      return false;
    }
    let mbNUm = this.data.mobile
    if (mbNUm == "") {
      wx.showToast({
        icon: 'none',
        title: '请填写手机号',
      })
      return false;
    }

    if (mbNUm.length != 11) {
      wx.showToast({
        icon: "none",
        title: '手机号码长度不符！',
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mbNUm)) {
      wx.showToast({
        icon: "none",
        title: '请输入有效的手机号码！',
      })
      return false;
    }

    if (this.data.sending) return false;
    this.setData({
      sending: true
    })
    this.getCode()
    this.getCodeTime(59);
  },
  //
  getCode: function() {
    let data = {
      mobile: this.data.mobile
    }
    Api.getVerifyCode(data, (res) => {
      if (res.status != 1) {
        wx.showToast({
          icon: 'none',
          title: res.message
        })
      } else {
        wx.showToast({
          title: "发送成功!",
        })
      }
    })
  },
  // 计算验证码倒计时
  getCodeTime: function(sec) {
    this.setData({
      timeTic: sec
    })
    var that = this
    var timeTic = this.data.timeTic;
    var interval = setInterval(function() {
      timeTic--;
      that.setData({
        timeTic: timeTic
      })
      if (timeTic <= 0) {
        clearInterval(interval)
        that.setData({
          sending: false,
          timeTic: 0
        })
      }
    }, 1000)
    return true;
  },
  showProtocol() {
    this.setData({
      showProtocol: true
    })
  },
  closedProtocol() {
    this.setData({
      showProtocol: false
    })
  }
})