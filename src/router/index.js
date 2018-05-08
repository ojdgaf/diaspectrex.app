import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter)

// configure router
export default new VueRouter({
  routes,
  linkActiveClass: 'nav-item active'
})
