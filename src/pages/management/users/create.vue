<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'management', title: 'Management'},
                {name: 'users.index', title: 'Users'},
                {name: '', title: 'Create'}]">
              </breadcrumbs>
            </template>
            <input-group></input-group>
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
    data () {
      return {}
    },
    created: function () {
    },
    computed: {},
    methods: {
      saveUser () {

      }
    }
  }
</script>

<style scoped>

</style>
