const Globals = {
  install (Vue) {
    installAlerts(Vue)
    installNotifications(Vue)
    installUser(Vue)
  }
}

// add alert functions (using vue-sweetalert2)
function installAlerts (Vue) {
  const alerts = {
    confirmation: {
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }
  }
  
  function $askForConfirmation (text = 'You won\'t be able to revert this!') {
    alerts.confirmation.text = text
    
    return this.$swal(alerts.confirmation).then(result => !! result.value)
  }
  
  Object.defineProperty(Vue.prototype, '$askForConfirmation', {
    value: $askForConfirmation
  })
}

// add notifications functions (using vue-notifyjs)
function installNotifications (Vue) {
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
  
  Object.defineProperty(Vue.prototype, '$successfully', {
    value: notifications.successfully
  })
  
  Object.defineProperty(Vue.prototype, '$unfortunately', {
    value: notifications.unfortunately
  })
}

// add user object wrapper that contains helpful methods
function installUser (Vue) {
  const $user = (underlying) => {
    let user = Vue._.cloneDeep(underlying)
    
    user.can = (permissionName) => {
      if (user.hasOwnProperty('permissions') && Array.isArray(user.permissions) && user.permissions.length)
        switch (typeof user.permissions[0]) {
          case 'string':
            return user.permissions.includes(permissionName)
          case 'object':
            return user.permissions.some(permission => permission.name === permissionName)
        }
      
      return false;
    }
    
    return user
  }
  
  Object.defineProperty(Vue.prototype, '$user', {
    value: $user
  })
}

export default Globals
