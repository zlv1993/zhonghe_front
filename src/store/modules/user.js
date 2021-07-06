import { getPermissonByName } from '@/api/permission'
import { getToken } from '@/utils/auth'
import { userInfo } from '@/api/user'
import { generateMenu } from '@/utils/tree'
const state = {
  menuList: [],
  avator: '',
  userInfo: {},
  permission: [],
}

const mutations = {
  SET_MENU: (state, menuList) => {
    state.menuList = menuList
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  },

}

const actions = {
  getMenuList ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      getPermissonByName({ username: state.userInfo.username }).then(res => {
        let permissionUrl = res.data ? res.data : []
        let menuList = generateMenu(permissionUrl)
        commit('SET_MENU', menuList)
        commit('SET_PERMISSION', permissionUrl)
        resolve(res.data ? res.data : [])
      }).catch(e => {
        reject(e)
      })
    })
  },

  // get user info
  getUserInfo ({ commit }) {
    return new Promise(async (resolve, reject) => {
      let token = await getToken();

      userInfo({ token }).then(res => {
        let { data } = res
        commit('SET_USERINFO', data ? data : {})
        resolve(data ? data : {})
      }).catch(e => {
        commit('SET_USERINFO', {})
        //  location.href = '/login'
        reject(e)
      })
    })
  },

  // 退出登录
  // logout({ commit, state }) {
  // return new Promise((resolve, reject) => {
  //   api.logout(Cookies.get('token')).then(res => {
  //     Cookies.set('token','')
  //     commit('SET_INFO', null)
  //     commit('SET_MENU', [])
  //     commit('SET_ROLES', null)
  //     commit('SET_ISADMIN', false)
  //     commit('SET_PERMISSION',[])
  //     resolve(res)
  //   }).catch(e => {
  //     reject(e)
  //   })
  // })
  // },

  // remove token
  // resetToken({ commit }) {
  // return new Promise(resolve => {
  //   Cookies.set('token','')
  //   commit('SET_INFO', null)
  //   commit('SET_MENU', [])
  //   commit('SET_ROLES', null)
  //   commit('SET_ISADMIN', false)
  //   commit('SET_PERMISSION',[])
  //   resolve()
  // })
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
