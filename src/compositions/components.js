import fgInput from 'src/components/UIComponents/Inputs/formGroupInput.vue'
import DropDown from 'src/components/UIComponents/Dropdown.vue'
import CRadio from 'src/components/UIComponents/Inputs/Radio.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import Breadcrumbs from 'src/components/UIComponents/Breadcrumbs.vue'
import TitleBlock from 'src/components/UIComponents/TitleBlock.vue'
import AddressComponent from 'src/components/UIComponents/AddressComponent.vue'
import Multiselect from 'vue-multiselect'

/**
 * Global components registration.
 */
export default {
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
