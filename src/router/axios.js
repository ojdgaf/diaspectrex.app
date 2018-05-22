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
        const response = error.response
          
          // inform user via notification
        ;(new Vue()).$notify(Vue.$notice.error(
          // hide a message of unexpected error from user
          response.status === 500 ? 'Sorry, something went wrong' : response.data.message
        ))
        
        return Promise.reject(response);
      }
    )
  }
}

export default customAxios
