import Cookies from 'js-cookie'
import {TOKEN} from './types'
export function getToken() {
  return Cookies.get(TOKEN)
}
export function setToken(token) {
  return Cookies.set(TOKEN, 'Bearer'+token)
}
export function removeToken() {
  return Cookies.remove(TOKEN)
}

export function loginIn(){
  let cookieVal= Cookies.get(TOKEN)
  return cookieVal?true:false
}