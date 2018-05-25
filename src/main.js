import Vue from 'vue';
import router from '@/router';
import App from '@/App.vue';
import plugins from '@/plugins';

// plugin setup
Vue.use(plugins);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
