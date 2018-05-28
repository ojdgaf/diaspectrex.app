export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$askForConfirmation', {
      value: $askForConfirmation
    })
  }
}

const alerts = {
  confirmation: {
    title: 'Are you sure?',
    text: '',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, do it',
    cancelButtonText: 'No, cancel!',
    confirmButtonClass: 'btn btn-success ml-1',
    cancelButtonClass: 'btn btn-danger ml-1',
    buttonsStyling: false
  }
}

function $askForConfirmation (text = 'You won\'t be able to revert this!') {
  alerts.confirmation.text = text
  
  return this.$swal(alerts.confirmation).then(result => !! result.value)
}
