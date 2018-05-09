<template>
  <div>
    <h1>Login</h1>

    <form v-on:submit.prevent="login()">
      <table>
        <tr>
          <td>email:</td>
          <td><input v-model="credentials.email"/></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input v-model="credentials.password" type="password"/></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type="submit">Login</button>
          </td>
        </tr>
      </table>

      <hr/>

    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        credentials: {
          email: 'a@a.a',
          password: '123456'
        }
      }
    },
    methods: {
      login() {
        this.$auth.login({
          data: this.credentials,
          rememberMe: true,
          fetchUser: true,
          redirect: {
            name: 'Index'
          }
        })
      }
    }
  }
</script>
