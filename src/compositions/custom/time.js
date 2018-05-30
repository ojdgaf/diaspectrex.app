export default {
  install (Vue) {
    window.timestamp = value => Vue.moment(value).unix()
    
    window.iso8601 = value => typeof value === 'number' ? Vue.moment.unix(value).toISOString() : Vue.moment(value).toISOString()
  }
}
