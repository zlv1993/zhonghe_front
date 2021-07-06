
import { postAction, getAction, deleteAction, putAction } from '@/utils/request'
import Qs from 'qs'

export const addPermisson = (data) => postAction('/permission/add', data)
export const updatePermisson = (data) => putAction('/permission/update', data)
export const deletePermisson = (data) => deleteAction('/permission/del', Qs.stringify(data))
export const delBatch = (data) => deleteAction('/permission/delBatch', data)
export const deletePermissons = (data) => deleteAction('/permission/delBatch', data)
export const getPermisson = (data) => getAction('/permission/getTByToken', data)
export const allPermisson = () => getAction('/permission/list', {})
export const getPermissonByName = (data) => getAction('/permission/getByName', data)
export const getByRoleId = (data) => getAction('/permission/getById', data)
