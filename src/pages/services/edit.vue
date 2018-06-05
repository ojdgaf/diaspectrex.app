<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'services.index', title: 'Services'},
                {name: '', title: 'Edit'}]">
              </breadcrumbs>
            </template>
            <div v-if="serviceIsReady">
              <div class="row justify-content-center">
                <c-input v-model="service.name" ll="Name" ph disabled>
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
                  <button @click="save" class="btn btn-success btn-fill">Save</button>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditService',
    props: {
      id: {
        type: [String, Number],
        required: true,
        validator: (value) => /^\d+$/.test(value)
      }
    },
    data () {
      return {
        service: null
      }
    },
    created: function () {
      this.setService()
    },
    computed: {
      serviceIsReady: function () {
        return this.service !== null
      }
    },
    methods: {
      setService () {
        return this.axios.get(`services/${this.id}`).then(res => this.service = res.data)
      },
      save () {
        this.$validator.validateAll()
          .then(result => result ? this.performSaveRequest() : this.$unfortunately('Please check input'))
      },
      performSaveRequest () {
        this.axios.put(`services/${this.service.id}`, this.service)
          .then(res => this.$router.push({name: 'services.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
