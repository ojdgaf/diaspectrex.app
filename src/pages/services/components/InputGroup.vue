<template>
  <div>
    <div class="row justify-content-center">
      <c-input v-model="service.name" v-validate="'required|min:2'" ll="Name" ph>
      </c-input>
    </div>
    <div class="row justify-content-center">
      <c-input v-model="service.description" v-validate="'required|min:4'"
               ll="Description" ph>
      </c-input>
    </div>
    <div class="row justify-content-center">
      <c-input v-model="service.price" v-validate="'required|decimal:2'"
               ll="Price" ph="Price in dollars">
      </c-input>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 offset-md-3 text-right">
        <button @click="validateBeforeAction" class="btn btn-success btn-fill">Save</button>
      </div>
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
