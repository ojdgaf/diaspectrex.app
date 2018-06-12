<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'services.index', title: 'Services'},
                {name: '', title: 'Edit service'}]">
              </breadcrumbs>
            </template>
            <input-group v-if="serviceIsReady" :service="service"
                         :action="saveService"></input-group>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputGroup from './components/InputGroup'

  export default {
    name: 'EditService',
    components: {
      InputGroup
    },
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
      saveService (service) {
        this.axios.put(`services/${service.id}`, service).then(res => this.$router.push({name: 'services.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
