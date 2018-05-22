<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Edit {{ user.name }}</h4>
              <p class="card-category"></p>
            </template>
            <div class="row">
              <fg-input v-model="user.email" class="col-md-4 col-sm-6 offset-md-2" label="Email" placeholder="Email">
              </fg-input>
              <fg-input v-model="user.last_name" class="col-md-4 col-sm-6 offset" label="Last name" placeholder="Last name">
              </fg-input>
            </div>
            <div class="row">
              <fg-input v-model="user.middle_name" class="col-md-4 col-sm-6 offset-md-2" label="Middle name" placeholder="Middle name">
              </fg-input>
              <fg-input v-model="user.first_name" class="col-md-4 col-sm-6 offset" label="First name" placeholder="First name">
              </fg-input>
            </div>
            <div class="row">
              <fg-input v-model="user.sex" class="col-md-4 col-sm-6 offset-md-2" label="Sex" placeholder="Sex">
              </fg-input>
              <fg-input v-model="user.birthday" class="col-md-4 col-sm-6 offset" label="Birthday" placeholder="Birthday">
              </fg-input>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/UIComponents/Cards/Card.vue'

  export default {
    name: "ManagementUsersEditPage",
    components: {
      Card
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        user: ''
      }
    },
    created: function () {
      this.setUser()
    },
    methods: {
      setUser() {
        this.loadUser().then(user => this.user = this.$user(user))
      },
      loadUser() {
        return this.axios.get('users/' + this.id).then(response => response.data)
      },
    }
  }
</script>

<style scoped>

</style>
