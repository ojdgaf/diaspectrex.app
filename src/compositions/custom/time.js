export default {
  install (Vue) {
    window.unix = value => Vue.moment(value).unix()
    
    window.iso = value => typeof value === 'number' ? Vue.moment.unix(value).toISOString() : Vue.moment(value).toISOString()
  }
}
