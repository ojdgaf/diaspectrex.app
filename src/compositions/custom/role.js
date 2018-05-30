import Vue from 'vue'

export default {
  can: function (permissionNames) {
    const requested = getRequestedPermissionNames(permissionNames)
    
    const available = getAvailablePermissionNames(this.roles)
    
    if (requested.length > 0 && available.length > 0)
      return Vue._.intersection(available, requested).length > 0
    
    return false
  },
  
  canAll: function (permissionNames) {
    const requested = getRequestedPermissionNames(permissionNames)
    
    const available = getAvailablePermissionNames(this.roles)
    
    if (requested.length > 0 && available.length > 0)
      return Vue._.isEqual(requested.sort(), Vue._.intersection(available, requested).sort())
    
    return false
  }
}

function getRequestedPermissionNames (permissionNames) {
  if (typeof permissionNames === 'string')
    return permissionNames.split('|')
  
  if ([].isArray(permissionNames))
    return permissionNames
  
  return []
}

function getAvailablePermissionNames (roles) {
  let available = [].concat(...roles.map(role => role.permissions))
  
  switch (typeof available[0]) {
    case 'string':
      return available
    case 'object':
      return available.map(permission => permission.name)
    default:
      return []
  }
}
