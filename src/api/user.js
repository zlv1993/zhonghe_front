import { postAction, getAction, deleteAction, putAction, apiAction } from '@/utils/request'
import Qs from 'qs'
export const login = (data) => apiAction('/login', 'POST', Qs.stringify(data));
export const userInfo = (data) => getAction(`/user/getByToken`, data);
export const userList = (data) => getAction('/user/list', data);
export const userInsert = (data) => postAction('/user/add', data);
export const userDel = (delId) => deleteAction(`/user/del/${delId}`, {});
export const userUpdate = (data) => putAction('/user/update', data);

