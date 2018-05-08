import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import LightBootstrap from './light-bootstrap-main'

// plugin setup
Vue.use(LightBootstrap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
