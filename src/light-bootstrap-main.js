import VTooltip from 'v-tooltip'
// A small wrapper for integrating lodash to Vuejs
import VueLodash from 'vue-lodash'
// Notifications plugin
import Notifications from 'vue-notifyjs'
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents'
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'
// Object in Vue prototype where you could register global variables
import Globals from '@/globals'
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './components/UIComponents/SidebarPlugin'

// asset imports
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-notifyjs/themes/default.scss'
import './assets/sass/light-bootstrap-dashboard.scss'
import './assets/css/demo.css'

// library auto imports
import 'es6-promise/auto'

/**
 * This is the main Light Bootstrap Dashboard Vue plugin where dashboard related plugins are registerd.
 */
export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(Notifications)
    Vue.use(VTooltip)
    Vue.use(VueLodash)
    Vue.use(Globals)
  }
}
