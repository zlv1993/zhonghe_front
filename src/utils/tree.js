/**
 * 路由树形结构
 * @param list 源数组
 * @param parentId 父ID
 */
export const generateRoutes = (list, RouterMap, parentId = 0) => {
  let treeJson = {}
  let btnJson = {}
  ///父级相同的树进行归类
  list.forEach(item => {
    if (item.type == 0) {
      let componentData = {
        path: item.url,
        name: item.name,
        id: item.id,
        meta: {},
        children: []
      }

      if (RouterMap[`${item.component}`]) {
        componentData.component = RouterMap[`${item.component}`]
      }
      if (item.redirect) {
        componentData.redirect = item.redirect
      }
      if (!treeJson[item.pid]) treeJson[item.pid] = []
      treeJson[item.pid].push(componentData)
    } else {
      if (!btnJson[item.pid]) btnJson[item.pid] = []
      btnJson[item.pid].push(item.component)
    }
  })
  ///拼凑路由
  const combine = (routes) => {
    routes.forEach(item => {
      if (treeJson[item.id]) {
        item.children = treeJson[item.id]
        combine(treeJson[item.id])
      } else {
        delete item.children
      }
      if (btnJson[item.id]) {
        item.meta.btns = btnJson[item.id]
      }
      // delete item.id
    })
    return routes
  }
  let routes = treeJson[parentId]
  return combine(routes)

}


/**
 * 左侧导航树形结构
 * @param list 源数组
 * @param parentId 父ID
 */
export const generateMenu = (list, parentId = 0) => {
  let menuJson = {}
  ///父级相同的树进行归类
  list.forEach(item => {
    if (item.type == 0 && item.display == 1) {
      let menuData = {
        name: item.name,
        pid: item.pid,
        id: item.id,
        url: item.url,
        icon: item.icon,
        redirect: item.redirect,
        children: []
      }
      menuData.url = item.url
      if (!menuJson[item.pid]) menuJson[item.pid] = []
      menuJson[item.pid].push(menuData)
    }
  })
  ///拼凑路由
  const combineMenu = (menus) => {
    menus.forEach(item => {
      let perMenuJson = menuJson[item.id]
      if (perMenuJson) {
        item.children = menuJson[item.id]
        combineMenu(menuJson[item.id])
      } else {
        delete item.children
      }

    })
    return menus
  }
  let menus = menuJson[parentId]
  return combineMenu(menus)
}
