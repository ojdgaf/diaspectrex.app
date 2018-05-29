// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from 'src/components/UIComponents/SidebarPlugin/index'
import VTooltip from 'v-tooltip'
import VueLodash from 'vue-lodash'
import Notifications from 'vue-notifyjs'
import wysiwyg from 'vue-wysiwyg'
import VueSweetalert2 from 'vue-sweetalert2'
import Datetime from 'vue-datetime'
import VeeValidate from 'vee-validate'

// asset imports
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-notifyjs/themes/default.scss'
import 'src/assets/sass/light-bootstrap-dashboard.scss'
import 'src/assets/css/demo.css'
import 'vue-datetime/dist/vue-datetime.css'

// library auto imports
import 'es6-promise/auto'

/**
 * Global third-party plugins registration.
 */
export default {
  install (Vue) {
    Vue.use(SideBar)
    Vue.use(Notifications)
    Vue.use(VTooltip)
    Vue.use(VueLodash)
    Vue.use(wysiwyg)
    Vue.use(VueSweetalert2)
    Vue.use(Datetime)
    Vue.use(VeeValidate)
  }
}
