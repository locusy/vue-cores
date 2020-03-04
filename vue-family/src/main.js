import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'

// 测试crouter
import router from './crouter'
// import store from './cstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
