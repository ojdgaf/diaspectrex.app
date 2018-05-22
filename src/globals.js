const Globals = {
  install (Vue) {
    installNotice(Vue)
    installUser(Vue)
  }
}

// return objects that are used by vue-notifyjs $notify method
function installNotice (Vue) {
  const $notice = {
    success (text = 'Successfully completed') {
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
    error (text = 'Oops, some error occurred!') {
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
  
  Object.defineProperty(Vue, '$notice', {
    get () {
      return $notice
    }
  })
  
  Object.defineProperty(Vue.prototype, '$notice', {
    get () {
      return $notice
    }
  })
}

// return user object wrapper that contains helpful methods
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
