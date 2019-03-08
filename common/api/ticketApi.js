import {
  http
} from '../http/http.js'
class ticketApi extends http {
  constructor(obj) {
    super(obj)
  }
  // 验证码
  getVerifyCode(data, handle) {
    this.postRequest({
      url: '/verificationCode',
      data: data,
      success: (res) => {
        handle(res.data)
      }
    })
  }
  // 展会信息
  getActivity(data, handle) {
    this.getRequest({
      url: '/activityid?cityid=' + data.cityId,
      success: (res) => {
        handle(res.data)
      }
    })
  }
  // 广告数据
  getAdvList(data, handle) {
    this.getRequest({
      url: '/eticket/advList?position=' + data.position + "&cityId=" + data.cityId,
      success(res) {
        handle(res.data)
      }
    })
  }
  // 查询登录
  login(data, handle) {
    this.postRequest({
      url: "/eticket/login",
      data: data,
      success(res) {
        handle(res.data)
      }
    })
  }
  // 用户登录状态
  loginStatus(data, handle) {
    this.getRequest({
      url: '/eticket/ticketStatus?cityId=' + data.cityId,
      success(res) {
        handle(res)
      }
    })
  }
  //买门票
  buyTicket(data, handle) {
    let token = data.token
    delete data.token
    this.postRequest({
      url: "/eticket/buy",
      data: data,
      header: {
        'token': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        handle(res.data)
      }
    })
  }
  // 退款
  refund(data, handle) {
    let token = data.token
    delete data.token
    this.postRequest({
      url: "/eticket/refund",
      data: data,
      header: {
        'token': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        handle(res.data)
      }
    })
  }
  // 获取城市Id
  getCityId(data, handle) {
    this.getRequest({
      url: "/getCityName?name=" + data.name,
      success(res) {
        handle(res.data)
      }
    })
  }
  // 获取用户门票列表
  getTicketList(data, handle) {
    this.getRequest({
      url: '/eticket/tickets?status=' + data.status + '&page=' + data.page + '&limit=' + data.limit,
      header: {
        'token': data.token
      },
      success(res) {
        handle(res)
      }
    })
  }
  //门票信息
  getTicketInfo(data, handle) {
    this.getRequest({
      url: "/eticket/ticket/" + data.ticketId,
      header: {
        'token': data.token
      },
      success(res) {
        handle(res.data)
      }
    })
  }
  //id获取门票
  getShareIdTicketInfo(data, handle) {
    this.getRequest({
      url: '/eticket/ticketId/' + data.ticketId,
      header: {
        'token': data.token
      },
      success(res) {
        handle(res)
      }
    })
  }
  // 检票轮询
  getCheckTicket(data, handle) {
    this.getRequest({
      url: "/eticket/checkTicket/" + data.ticketId,
      header: {
        token: data.token
      },
      success(res) {
        handle(res)
      }
    })
  }
  // 50门票
  getTokenOrder(data, handle) {
    this.getRequest({
      url: '/eticket/ticketOrder',
      header: {
        toKen: data.token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        handle(res)
      }
    })
  }
  // 领取
  getShareTicket(data, handle) {
    // console.log(data.token, 'dsssssss')
    let token = data.token
    delete data.token
    this.getRequest({
      url: "/eticket/getTicket/" + data.ticketId,
      header: {
        token: token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        handle(res)
      }
    })
  }
  // 获取下届展会
  getNextTicket(data, handle) {
    this.getRequest({
      url: '/eticket/getNextTicket/' + data.cityId,
      header: {
        token: data.token
      },
      success(res) {
        handle(res)
      }
    })
  }
}
export {
  ticketApi
}