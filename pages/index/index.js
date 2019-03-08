//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    animationData:{},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgList: ['../../img/banner1.jpg',
      '../../img/banner2.jpg',
      '../../img/banner3.jpg']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    
  },
  onShow(){
    const animation = wx.createAnimation({
      duration: 1000
    })
    this.animation = animation
    animation.translateY(-100).step()
    this.setData({
      animationData: animation.export()
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  swiperChange(e) {
    //加判断不为手动滚动再执行动画
    if(e.detail.source !== "touch"){
      this.animation.scale(1.5, 1.5).step()
      this.animation.scale(1, 1).step()
      this.animation.translate(30).step()
      this.animation.translate(0).step()
      this.setData({
        animationData: this.animation.export()
      })
    }
  },
  login(){
    wx.showLoading({
      title: '正在跳转登录',
    })
    wx.navigateTo({
      url: '/pages/login/login',
    })
    wx.hideLoading()
  }
})