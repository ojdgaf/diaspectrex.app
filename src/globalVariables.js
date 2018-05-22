export default {
  urls: {
    api: 'http://127.0.0.1:8080'
  },
  notifications: {
    success: function (text) {
      return {
        component: {
          template: `<span>${text}</span>`
        },
        icon: 'fa fa-check',
        horizontalAlign: 'right',
        verticalAlign: 'bottom',
        type: 'success'
      }
    },
    error: function (text) {
      return {
        component: {
          template: `<span>${text}</span>`
        },
        icon: 'fa fa-exclamation-triangle',
        horizontalAlign: 'right',
        verticalAlign: 'bottom',
        type: 'danger'
      }
    }
  }
}
