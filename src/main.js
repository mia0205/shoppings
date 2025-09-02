import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast } from 'vant'
import '@/styles/common.less'

import '@/utils/vant'

Vue.use(Toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
