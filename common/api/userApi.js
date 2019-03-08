import {
  http
} from '../http/http.js'

class userApi extends http {
  constructor(obj) {
    super(obj)
  }

  ticketLogin(data, handle) {
    this.postRequest({
      url: '/eticket/login',
      data: data,
      success: (res) => {
        handle(res.data)
      }
    })
  }
  user(data, handle) {
    this.getRequest({
      url: "/user",
      success(res) {
        handle(res)
      }
    })
  }

} // 
export {
  userApi
}