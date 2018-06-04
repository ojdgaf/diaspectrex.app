import VeeValidate from 'vee-validate'

export default {
  install (Vue) {
    VeeValidate.Validator.extend('a_min', {
      getMessage: (field, [min]) => `The ${field} must have at least ${min} items.`,
      validate: (value, [min]) => {
        if (value === undefined || value === null || ! Array.isArray(value))
          return false
        
        return value.length >= Number(min)
      }
    })
    
    VeeValidate.Validator.extend('a_between', {
      getMessage: (field, [min, max]) => `The ${field} must have between ${min} and ${max} items.`,
      validate: (value, [min, max]) => {
        if (value === undefined || value === null || ! Array.isArray(value))
          return false
        
        return value.length >= Number(min) && value.length <= Number(max)
      }
    })
  }
}
