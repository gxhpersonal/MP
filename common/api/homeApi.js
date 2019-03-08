import {
  http
} from '../http/http.js'

class homeApi extends http {
  constructor(obj) {
    super(obj)
  }

  // 主页数据
  homeData(data, handle) {
    this.getRequest({url: '/home?cityid=' + data.cityId + '&activityid=' + data.activityId}).then((res)=>{
      handle(res)
    }).catch((err)=>{})
  }

  getCity(handle) {
    this.getRequest({
      url: '/citylist',
      success: (res) => {
        handle(res.data)
      }
    })
  }

  getActivity(cityId, handle) {
    this.getRequest({
      url: '/activityid?cityid=' + cityId,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  login(data, handle) {
    this.postRequest({
      url: '/wxlogin',
      data: data,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  getVerifyCode(data, handle) {
    this.postRequest({
      url: '/verificationCode',
      data: data,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  getUserInfo(cityId, activityId, handle) {
    this.getRequest({
      url: '/user?cityid=' + cityId + '&activityid=' + activityId,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  getSvipInfo(cityId, activityId, handle) {
    this.getRequest({
      url: '/svipInfo?cityid=' + cityId + '&activityid=' + activityId,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  getCityCheck(activityId, handle) {
    this.getRequest({
      url: "/svipRefund?activityId=" + activityId,
      success(res) {
        handle(res.data)
      }
    })
  }

  getActivityInfo(cityId, activityId, handle) {
    this.getRequest({
      url: '/svip?cityid=' + cityId + '&activityid=' + activityId,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  placeOrder(data, handle) {
    this.postRequest({
      url: '/svipOrder',
      data: data,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  placeGoodsOrder(data, handle) {
    this.postRequest({
      url: '/goodsOrder',
      data: data,
      success: (res) => {
        handle(res.data)
      }
    })
  }

  getGoodsInfo(goodsId, handle) {
    this.getRequest({
      url: '/goodsInfo?goodsid=' + goodsId,
      success: (res) => {
        handle(res.data)
      }
    })
  }
  // 购买记录
  getSvipPurchaseRecord(data, handle) {
    this.getRequest({
      url: "/svipPurchaseRecord",
      success(res) {
        handle(res)
      }
    })
  }
  // 退款
  svipRefund(data, handle) {
    this.getRequest({
      url: '/svipRefund?activityId=' + data.activityId,
      success(res) {
        handle(res)
      }
    })
  }
  //定金商品

  getGoodsList(data, handle) {
    this.getRequest({
      url: "/goodsList",
      data: data,
      success(res) {
        handle(res)
      }
    })
  }
  user(data,handel){
    this.getRequest({
      url:"/user",
      data:data,
      success(res){
        handel(res)
      }
    })
  }




}

export {
  homeApi
}