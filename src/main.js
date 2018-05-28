import Vue from 'vue';
import router from 'src/router';
import App from 'src/App.vue';
import Setup from 'src/compositions';

Vue.use(Setup);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
