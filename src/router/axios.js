import axios from 'axios'
import VueAxios from 'vue-axios'

const customAxios = {
  install (Vue) {
    Vue.use(VueAxios, axios)
    
    Vue.axios.defaults.baseURL = 'http://api.diaspectrex.test'
    
    Vue.axios.interceptors.response.use(
      (response) => {
        // get response body directly
        return response.data;
      },
      (error) => {
          // inform user via notification
        ;(new Vue()).$unfortunately(
          // hide a message of unexpected error from user
          error.response.status === 500 ? 'Sorry, something went wrong' : error.response.data.message
        )

        return Promise.reject(error);
      }
    )
  }
}

export default customAxios
