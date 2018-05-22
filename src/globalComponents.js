import fgInput from '@/components/UIComponents/Inputs/formGroupInput.vue'
import DropDown from '@/components/UIComponents/Dropdown.vue'
import PRadio from '@/components/UIComponents/Inputs/Radio.vue'
import Card from '@/components/UIComponents/Cards/Card.vue'
import Breadcrumbs from '@/components/UIComponents/Breadcrumbs.vue'
import TitleBlock from '@/components/UIComponents/TitleBlock.vue'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('drop-down', DropDown)
    Vue.component(PRadio.name, PRadio)
    Vue.component('card', Card)
    Vue.component('breadcrumbs', Breadcrumbs)
    Vue.component('title-block', TitleBlock)
  }
}

export default GlobalComponents
