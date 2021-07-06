export const generateMenu = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.pid === parentId) {
      if (item.redirect) {
        item.path = item.redirect
      }
      item.children = []
      generateMenu(list, item.children, item.id)
      if (item.children.length == 0) {
        delete item.children
      }
      // 加入到树中
      tree.push(item)
    }

  })
  return tree
}