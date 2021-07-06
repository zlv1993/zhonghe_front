import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { getToken } from '@/utils/auth'
import { HttpErrorMsg } from '@/utils/message'
import { TOKEN } from './types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30000, // 请求超时时间

})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error == "Error: Network Error") {
    notification.error({
      message: "网络错误",
      description: "与服务器的链接出现了问题，请检查网络链接",
    });
  } else if (error.code == "ECONNABORTED") {
    notification.error({
      message: "请求超时",
      description: "请求超时了，请检查服务器",
    });
  } else {
    notification.error({
      message: "请求发生了错误",
      description: HttpErrorMsg[error.response.status],
    });
  }
  return Promise.reject(error);
}
request.interceptors.request.use(
  config => {
    let token = getToken()
    if (token) {
      config.headers[TOKEN] = token
    }
    return config
  }, errorHandler
)


request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      notification.error({
        message: res.msg,
        description: '错误提示'
      })
      if (res.code === 403) {
        // console.log("see")
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res

  }, errorHandler)

export default request;
//post
export function postAction (url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
//get
export function getAction (url, param) {
  return request({
    url: url,
    method: 'get',
    params: param
  })
}

//deleteAction
export function deleteAction (url, param) {
  return request({
    url: url,
    method: 'delete',
    params: param
  })
}

//put
export function putAction (url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}

export function apiAction (url, method, data) {
  return request({
    url,
    method,
    data
  })
}




