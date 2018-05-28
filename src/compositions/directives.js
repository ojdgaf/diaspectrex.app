import { directive as vClickOutside } from 'vue-clickaway'

/**
 * Global directives registration.
 */
export default {
  install (Vue) {
    Vue.directive('click-outside', vClickOutside)
  }
}
