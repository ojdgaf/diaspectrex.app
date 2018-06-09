<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'roles.index', title: 'Roles'},
                {name: '', title: 'Create'}]">
              </breadcrumbs>
            </template>
            <input-group :action="saveRole"></input-group>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputGroup from './components/InputGroup'

  export default {
    name: 'CreateRole',
    components: {
      InputGroup
    },
    methods: {
      saveRole (role) {
        this.axios.post(`roles`, role).then(res => this.$router.push({name: 'roles.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
