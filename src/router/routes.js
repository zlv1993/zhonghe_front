
const routes = [
  {
    path: '/login',
    component: () => import("@/pages/Login.vue"),
  },
  // 下面都是需要删除
  // 
  // {
  //   path: '/visual/webgl',
  //   component: () => import("@/pages/visual/webgl.vue"),
  // }

  {
    path: '/wechat/:room',
    component: () => import("@/pages/wechat/Room.vue"),
  },

  {
    path: '/visual/map',
    component: () => import("@/pages/visual/Map.vue"),
  }

]




export default routes