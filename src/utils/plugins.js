const Plugins = {
  install (Vue) {
    Vue.filter('convert', function (value = 0, params = ['否', '是']) {
      return params[value]
    })

  }
}
export default Plugins;