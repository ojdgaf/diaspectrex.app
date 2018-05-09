<template>
  <div>
    <h1>Login</h1>

    <form v-on:submit.prevent="login()">
      <table><tr>
        <td>email:</td>
        <td><input v-model="data.body.email" /></td>
      </tr><tr>
        <td>Password:</td>
        <td><input v-model="data.body.password" type="password" /></td>
      </tr><tr>
        <td></td>
        <td><label><input v-model="data.rememberMe" type="checkbox" /> Remember Me</label></td>
      </tr><tr>
        <td></td>
        <td><label><input v-model="data.fetchUser" type="checkbox" /> Fetch User (test)</label></td>
      </tr><tr>
        <td></td>
        <td><button type="submit">Login</button></td>
      </tr></table>

      <hr/>

    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        context: 'login context',
        data: {
          body: {
            email: 'a@a.a',
            password: '123456'
          },
          rememberMe: false,
          fetchUser: true
        },
        error: null
      };
    },
    mounted() {
      // Can set query parameter here for auth redirect or just do it silently in login redirect.
    },
    methods: {
      login() {
        this.$auth.login({
          data: this.data.body,
          rememberMe: true,
          fetchUser: true,
        }).then(res => console.log(this.$auth.user().last_name))

        // this.$auth.fetch().then(res => console.log(res.data))
      }
    }
  }
</script>
