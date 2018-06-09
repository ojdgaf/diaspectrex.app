<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'users.index', title: 'Users'},
                {name: '', title: 'Create'}]">
              </breadcrumbs>
            </template>
            <input-group :action="saveUser"></input-group>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputGroup from './components/InputGroup.vue'

  export default {
    name: 'CreateUser',
    components: {
      InputGroup
    },
    methods: {
      saveUser (user) {
        this.axios.post(`users`, user).then(res => this.$router.push({name: 'users.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
