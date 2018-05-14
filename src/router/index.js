import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import routes from '@/router/routes'
import GlobalVariables from '@/globalVariables'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = GlobalVariables.urls.api

Vue.router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item active'
})

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@/router/tokenDriver'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  tokenDefaultName: 'access_token',
  rolesVar: 'roleNames'
})

export default Vue.router
