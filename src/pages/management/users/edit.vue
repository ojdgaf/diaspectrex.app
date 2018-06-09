<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                {name: 'users.index', title: 'Users'},
                {name: '', title: 'Edit'}]">
              </breadcrumbs>
            </template>
            <input-group v-if="userIsReady" :initialUser="user" :action="saveUser"></input-group>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputGroup from './components/InputGroup.vue'

  export default {
    name: "EditUser",
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
        user: null
      }
    },
    created: function () {
      this.setUser()
    },
    computed: {
      userIsReady: function () {
        return this.user !== null
      }
    },
    methods: {
      setUser () {
        return this.axios.get(`users/${this.id}`).then(res => this.user = res.data)
      },
      saveUser (user) {
        this.axios.put(`users/${user.id}`, user).then(res => this.$router.push({name: 'users.index'}))
      }
    }
  }
</script>

<style scoped>

</style>
