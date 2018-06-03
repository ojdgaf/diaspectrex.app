<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'management', title: 'Management'},
                {name: 'roles.index', title: 'Roles'},
                {name: '', title: 'Edit'}]">
              </breadcrumbs>
            </template>
            <input-group v-if="roleIsReady" :role="role" :action="saveRole"></input-group>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputGroup from './components/InputGroup'

  export default {
    name: 'EditRole',
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
        role: null
      }
    },
    created: function () {
      this.setRole()
    },
    computed: {
      roleIsReady: function () {
        return this.role !== null
      }
    },
    methods: {
      setRole () {
        return this.axios.get(`roles/${this.id}`).then(res => this.role = res.data)
      },
      saveRole (role) {
        this.axios.put(`roles/${role.id}`, role).then(res => this.$router.push({name: 'roles.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
