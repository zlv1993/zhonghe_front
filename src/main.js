import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import Plugins from '@/utils/plugins'
import router from './router'
import store from '@/store/'
import * as echarts from 'echarts'
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts
const Bus = new Vue();
Vue.use(Antd);
Vue.use(Plugins)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  data: { Bus },
  render: h => h(App)
}).$mount("#app")