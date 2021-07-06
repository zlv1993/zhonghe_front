import request from '@/utils/request'
import Qs from 'qs'
export function roleAll () {
  return request({
    url: '/role/all',
    method: 'get',
  })
}

export function roleList (data) {
  return request({
    url: '/role/list',
    method: 'get',
    params: data
  })
}
export function addRole (data) {
  return request({
    url: '/role/add',
    method: 'post',
    data: data
  })
}
export function roleDel (data) {
  return request({
    url: `/role/del/${data.id}`,
    method: 'delete'
  })
}

export function updateRole (data) {
  return request({
    url: '/role/update',
    method: 'put',
    data: data
  })
}