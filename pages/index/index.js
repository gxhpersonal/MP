//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    comment:false,
    animationData:{},
    userInfo: {},
    staList:5,
    tapIndex:-1,
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
  },
  //下拉刷新
  onPullDownRefresh() {
    console.log('下拉了');
  },
  //上划加载
  onReachBottom(){
    console.log("到底了")
  },
  //评论
  commentPop(){
    this.setData({ comment: true}) 
  },
  closeComment(){
    this.setData({ comment: false })
  },
  //点击星星
  tapComment(e){
    this.setData({
      tapIndex:e.target.dataset.id
    })
  },
  //提交评论
  subComment(){
    console.log(this)
    if (this.data.tapIndex !== -1){
      wx.showToast({
        title: '评论成功',
      })
      this.setData({ comment: false })
    }else{
wx.showToast({
  title: '请先评论',
})
    }
  }
})