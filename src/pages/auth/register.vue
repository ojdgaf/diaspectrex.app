<template>
  <div>
    <h1>Register</h1>

    <form v-on:submit.prevent="register()">
      <table><tr>
        <td>Avatar</td>
        <td><input v-on:change="setAvatar" type="file" /></td>
        <tr>
          <td>Username:</td>
          <td><input v-model="data.body.username" /></td>
        </tr><tr>
          <td>Password:</td>
          <td><input v-model="data.body.password" type="password" /></td>
        </tr><tr>
          <td></td>
          <td><label><input v-model="data.autoLogin" type="checkbox" /> Auto Login</label></td>
        </tr><tr>
          <td></td>
          <td><label><input v-model="data.rememberMe" type="checkbox" /> Remember Me</label></td>
        </tr><tr>
          <td></td>
          <td><button type="submit">Register</button></td>
        </tr></table>

      <hr/>

      <div v-show="error" style="color:red; word-wrap:break-word;">{{ error | json }}</div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        context: 'register context',

        data: {
          body: {
            username: '',
            password: '',
            avatar: null
          },
          autoLogin: false,
          rememberMe: false
        },
        formData: new FormData(),
        error: null
      }
    },
    methods: {
      register () {
        var formData = new FormData()
        if (this.data.body.avatar) {
          formData.append('avatar', this.data.body.avatar)
        }
        formData.append('username', this.data.body.username)
        formData.append('password', this.data.body.password)
        this.$auth.register({
          data: formData, // Axios
          autoLogin: this.data.autoLogin,
          rememberMe: this.data.rememberMe,
          success: function () {
            console.log('success ' + this.context)
          },
          error: function (res) {
            console.log('error ' + this.context)
            this.error = res.data
          }
        })
      }
    }
  }
</script>