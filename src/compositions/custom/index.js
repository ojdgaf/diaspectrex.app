import Alerts from './alerts'
import Notifications from './notifications'
import User from './user'
import Time from './time'

/**
 * Global custom plugins registration.
 */
export default {
  install(Vue) {
    Vue.use(Alerts)
    Vue.use(Notifications)
    Vue.use(User)
    Vue.use(Time)
  }
}
