export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$successfully', {
      value: notifications.successfully
    })
    
    Object.defineProperty(Vue.prototype, '$unfortunately', {
      value: notifications.unfortunately
    })
  }
}

const notifications = {
  successfully (text = 'Successfully completed') {
    this.$notify({
      component: {
        template: `<span>${text}</span>`
      },
      icon: 'fa fa-check',
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
      type: 'success'
    })
  },
  unfortunately (text = 'Oops, some error occurred!') {
    this.$notify({
      component: {
        template: `<span>${text}</span>`
      },
      icon: 'fa fa-exclamation-triangle',
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
      type: 'danger'
    })
  }
}
