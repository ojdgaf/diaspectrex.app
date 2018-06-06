<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'services.index', title: 'Services'},
                {name: '', title: 'Create'}]">
              </breadcrumbs>
            </template>
            <input-group :action="saveService"></input-group>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputGroup from './components/InputGroup'

  export default {
    name: 'CreateService',
    components: {
      InputGroup
    },
    methods: {
      saveService (service) {
        this.axios.post(`services`, service).then(res => this.$router.push({name: 'services.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
