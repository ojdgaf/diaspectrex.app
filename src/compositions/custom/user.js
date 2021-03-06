import Role from './role'

export default {
  install (Vue) {
    async function $user (underlying) {
      const wrapper = new UserWrapper(Vue, underlying)
      
      return wrapper.wrap().then(() => wrapper.get())
    }
    
    Object.defineProperty(Vue.prototype, '$user', {
      value: $user
    })
  }
}

class UserWrapper {
  constructor (Vue, underlying) {
    this.vue = Vue
    this.user = this.cloneObject(underlying)
  }
  
  get () {
    return this.user
  }
  
  async wrap () {
    if (this.isEmpty())
      this.setEmptyProperties()
    
    this.user.can    = Role.can
    this.user.canAll = Role.canAll
    
    await this.setACL()
    
    this.markObject()
  }
  
  cloneObject (underlying) {
    return this.vue._.cloneDeep(underlying)
  }
  
  markObject () {
    this.user.wrapped = true
  }
  
  isEmpty () {
    return this.user === null || this.user === undefined ||
      ! this.user.hasOwnProperty('id') || this.user.id === null
  }
  
  setEmptyProperties () {
    this.user = {
      id: null,
      email: null,
      password: null,
      first_name: null,
      middle_name: null,
      last_name: null,
      sex: 'male',
      birthday: null,
      address_id: null,
      address: null,
      hospital_id: null,
      hospital: null,
      passport: null,
      is_present: true,
      about: null,
      hired_at: null,
      fired_at: null,
      degree: null,
      roles: [],
      permissions: []
    }
  }
  
  async setACL () {
    if (! this.isEmpty() && ! this.hasRoles())
      await this.setRoles()
  }
  
  hasRoles () {
    return this.user.hasOwnProperty('roles') && Array.isArray(this.user.roles)
  }
  
  hasPermissions () {
    return this.user.hasOwnProperty('permissions') && Array.isArray(this.user.permissions)
  }
  
  hasPermissionNames () {
    return this.user.hasOwnProperty('permission_names') && Array.isArray(this.user.permission_names)
  }
  
  async setRoles () {
    const res = await this.vue.axios.get(`users/${this.user.id}/roles`)
    
    this.user.roles = res.data
  }
  
  async setPermissions () {
    const res = await this.vue.axios.get(`users/${this.user.id}/permissions`)
    
    this.user.permissions = res.data
  }
  
  setPermissionNames () {
    this.user.permission_names = this.user.permissions.map(permission => permission.name)
  }
}
