const Globals = {
  install (Vue) {
    installNotice(Vue)
    installUser(Vue)
  }
}

// add notifications functions (using vue-notifyjs)
function installNotice (Vue) {
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
