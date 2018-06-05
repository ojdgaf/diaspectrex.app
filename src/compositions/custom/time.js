export default {
  install (Vue) {
    const format = 'dddd, Do MMMM YYYY, HH:mm:ss'
    
    const now = () => Vue.moment().unix()
    
    const unix = (value = now()) =>
      typeof value === 'number' ? value : Vue.moment(value).unix()
    
    const iso = (value = now()) =>
      typeof value === 'number' ? Vue.moment.unix(value).toISOString() : Vue.moment(value).toISOString()
    
    const when = (value = now()) =>
      typeof value === 'number' ? Vue.moment.unix(value).format(format) : Vue.moment(value).format(format)
    
    const fromNow = (value = now()) =>
      typeof value === 'number' ? Vue.moment.unix(value).fromNow() : Vue.moment(value).fromNow()
    
    Object.defineProperty(Vue.prototype, '$unix', {value: unix})
    Object.defineProperty(Vue.prototype, '$iso', {value: iso})
    Object.defineProperty(Vue.prototype, '$when', {value: when})
    Object.defineProperty(Vue.prototype, '$fromNow', {value: fromNow})
  }
}
