import Components from './components'
import Directives from './directives'
import Plugins from './plugins'
import CustomPlugins from './custom'

/**
 * Global Vue setup.
 */
export default {
  install (Vue) {
    Vue.use(Components)
    Vue.use(Directives)
    Vue.use(Plugins)
    Vue.use(CustomPlugins)
  }
}
