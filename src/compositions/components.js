import CInput from 'src/components/UIComponents/Inputs/Input.vue'
import DropDown from 'src/components/UIComponents/Dropdown.vue'
import CRadio from 'src/components/UIComponents/Inputs/Radio.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import Breadcrumbs from 'src/components/UIComponents/Breadcrumbs.vue'
import TitleBlock from 'src/components/UIComponents/TitleBlock.vue'
import AddressComponent from 'src/components/UIComponents/AddressComponent.vue'
import Multiselect from 'vue-multiselect'
import PhoneComponent from '@/components/UIComponents/PhoneComponent.vue'
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback';

/**
 * Global components registration.
 */
export default {
  install (Vue) {
    Vue.component('c-input', CInput)
    Vue.component('drop-down', DropDown)
    Vue.component('c-radio', CRadio)
    Vue.component('card', Card)
    Vue.component('breadcrumbs', Breadcrumbs)
    Vue.component('title-block', TitleBlock)
    Vue.component('address-component', AddressComponent)
    Vue.component('multiselect', Multiselect)
    Vue.component('phone-component', PhoneComponent)
    Vue.component('b-form-input', bFormInput)
    Vue.component('b-form-invalid-feedback', bFormInvalidFeedback)
  }
}
