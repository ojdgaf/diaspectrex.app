<template>
  <div class="col-xs-12 col-md-9">
    <c-input v-model="service.name"
             v-validate="'required|min:2'"
             ll="Name" ph="Name...">
    </c-input>

    <c-input v-model="service.description"
             ll="Description" ph="Description..." component="wysiwyg"
             v-validate="'required'">
    </c-input>

    <c-input v-model="service.price"
             v-validate="'required|decimal:2'"
             ll="Price" ph="Price in dollars...">
    </c-input>
    <div class="col-xs-12 text-right">
      <button @click="validateBeforeAction" class="btn btn-success btn-fill">Save</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputGroup',
    props: {
      service: {
        type: Object,
        default: function () {
          return {
            name: null,
            description: null,
            price: null
          }
        }
      },
      action: Function
    },
    methods: {
      validateBeforeAction () {
        this.$validator.validateAll()
          .then(result => result ? this.callAction() : this.$unfortunately('Please check input'))
      },
      callAction () {
        this.action(this.preparedService())
      },
      preparedService () {
        return this._.cloneDeep(this.service)
      }
    }
  }
</script>

<style scoped>

</style>
