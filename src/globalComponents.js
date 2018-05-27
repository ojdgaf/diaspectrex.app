import fgInput from '@/components/UIComponents/Inputs/formGroupInput.vue'
import DropDown from '@/components/UIComponents/Dropdown.vue'
import CRadio from '@/components/UIComponents/Inputs/Radio.vue'
import Card from '@/components/UIComponents/Cards/Card.vue'
import Breadcrumbs from '@/components/UIComponents/Breadcrumbs.vue'
import TitleBlock from '@/components/UIComponents/TitleBlock.vue'
import AddressComponent from '@/components/UIComponents/AddressComponent.vue'
import Multiselect from 'vue-multiselect'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('drop-down', DropDown)
    Vue.component('c-radio', CRadio)
    Vue.component('card', Card)
    Vue.component('breadcrumbs', Breadcrumbs)
    Vue.component('title-block', TitleBlock)
    Vue.component('address-component', AddressComponent)
    Vue.component('multiselect', Multiselect)
  }
}

export default GlobalComponents
