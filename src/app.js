import Vue from 'vue'
import AppLayout from './theme/Layout.vue'
import router from './router'
import store from './vuex/index.js'

console.log('Vue Version ' + Vue.version)

const app = new Vue({
  router,
  ...AppLayout,
  store
})

Vue.config.devtools = true

export { app, router, store }
