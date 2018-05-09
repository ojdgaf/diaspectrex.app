<template>
  <div class="login">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="static/img/diaspectrex.jpg" alt="logo">
      <div class="card-body">
        <form v-on:submit.prevent="register()">
          <fg-input placeholder="Email" v-model="user.email"></fg-input>

          <fg-input placeholder="First name" v-model="user.first_name"></fg-input>

          <fg-input placeholder="Middle name" v-model="user.middle_name"></fg-input>

          <fg-input placeholder="Last name" v-model="user.last_name"></fg-input>

          <p-radio v-model="user.sex" value="Male" label="Male">Male</p-radio>

          <p-radio v-model="user.sex" value="Female" label="Female">Female</p-radio>

          <fg-input placeholder="Birthday (YYYY-MM-DD)" v-model="user.birthday"></fg-input>

          <fg-input placeholder="Password" v-model="user.password"></fg-input>

          <fg-input placeholder="Confirm password" v-model="user.password_confirmation"></fg-input>

          <p class="text-right">
            <router-link :to="{ name: 'Login' }" class="small ml-auto my-auto">
              already have an account? sign in
            </router-link>
          </p>

          <div class="text-center">
            <button class="btn bten-default mx-auto" type="submit">Sign up</button>
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
        user: {
          email: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          password: '',
          password_confirmation: '',
          sex: 'Male',
          birthday: ''
        },
      }
    },
    methods: {
      register () {
        this.$auth.register({
          data: this.user,
          autoLogin: true,
          rememberMe: true,
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

