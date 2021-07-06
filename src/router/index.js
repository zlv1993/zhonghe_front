import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { loginIn } from '@/utils/auth'
import RouterMap from '@/router/router-map'
import { generateRoutes } from '@/utils/tree'
import store from '@/store/'
Vue.use(VueRouter)

// 防止重复点击相同路由，报错问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes
})


export const createRouter = (routers) => new VueRouter({
  routers,
  mode: 'history'
})
const whiteList = [
  '/login'
]
const noFoundPage = [
  {
    path: '/404',
    name: '/404',
    component: RouterMap['404']
  },
  {
    path: '*',
    name: '/*',
    redirect: '/404'
  }
]

router.beforeEach(async (to, from, next) => {
  if (whiteList.indexOf(to.path) > -1) {//白名单
    next()
  } else {//跳往登录页面
    if (loginIn()) {//是否登录
      let { userInfo } = store.state.user
      if (JSON.stringify(userInfo) == "{}") {
        await store.dispatch('user/getUserInfo')
        await store.dispatch('user/getMenuList').then(res => {
          let asyncRouter = generateRoutes(res, RouterMap)
          router.addRoutes(asyncRouter)
          router.addRoutes(noFoundPage)
          next(to.path)
        }).catch(() => {
          next({
            path: '/login',
            query: { redirect: to.fullPath },
            replace: true
          })
        })
      } else {
        next()
      }

    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }


  }



})

export default router