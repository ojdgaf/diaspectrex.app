<template>
  <div class="login">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="static/img/diaspectrex.jpg" alt="logo">
      <div class="card-body">
        <form v-on:submit.prevent="login()">
          <fg-input placeholder="Email" v-model="credentials.email"></fg-input>

          <fg-input placeholder="Password" v-model="credentials.password"></fg-input>

          <p class="text-right">
            <router-link :to="{ name: 'Password request' }" class="small ml-auto my-auto">
              forgot password
            </router-link>
          </p>

          <p class="text-right">
            <router-link :to="{ name: 'Register' }" class="small ml-auto my-auto">
              sign up
            </router-link>
          </p>

          <div class="text-center">
            <button class="btn bten-default mx-auto" type="submit">Sign in</button>
          </div>

          <p class="mt-5 mb-3 text-muted text-center">&copy; 2018 DiaSpectrEx</p>
        </form>
      </div>
    </div>
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

<style scoped>
  .login {
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
