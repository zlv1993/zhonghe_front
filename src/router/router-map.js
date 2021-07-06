const routerMap = {
  'MenuLayout': () => import('@/pages/layout/MenuLayout.vue'),
  'BasicLayout': () => import('@/pages/layout/BasicLayout.vue'),
  '404': () => import('@/pages/404.vue'),
  '@/pages/Home': () => import("@/pages/Home.vue"),
  '@/pages/permission/Role': () => import('@/pages/permission/Role.vue'),
  '@/pages/permission/User': () => import('@/pages/permission/User.vue'),
  '@/pages/permission/Url': () => import('@/pages/permission/Url.vue'),
  '@/pages/permission/addUser': () => import('@/pages/permission/addUser.vue'),
  '@/pages/permission/addRole': () => import('@/pages/permission/addRole.vue'),
  '@/pages/permission/addUrl': () => import('@/pages/permission/addUrl.vue'),
  '@/pages/visual/webgl': () => import('@/pages/visual/webgl.vue'),

}
export default routerMap;