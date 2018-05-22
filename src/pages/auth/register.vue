<template>
  <div class="login">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="static/img/diaspectrex.jpg" alt="logo">
      <div class="card-body">
        <form v-on:submit.prevent="register()">
          <fg-input v-model="payload.email" placeholder="Email"></fg-input>

          <fg-input v-model="payload.first_name" placeholder="First name"></fg-input>

          <fg-input v-model="payload.middle_name" placeholder="Middle name"></fg-input>

          <fg-input v-model="payload.last_name" placeholder="Last name"></fg-input>

          <p-radio v-model="payload.sex" value="Male" label="Male">Male</p-radio>

          <p-radio v-model="payload.sex" value="Female" label="Female">Female</p-radio>

          <fg-input v-model="payload.birthday" placeholder="Birthday (YYYY-MM-DD)"></fg-input>

          <fg-input v-model="payload.password" :type="passwordFieldType" placeholder="Password"></fg-input>

          <fg-input v-model="payload.password_confirmation" :type="passwordFieldType" placeholder="Confirm password"></fg-input>

          <button type="button" @click="switchVisibility">show / hide</button>

          <p class="text-right">
            <router-link :to="{ name: 'Login' }" class="small ml-auto my-auto">
              already have an account? sign in
            </router-link>
          </p>

          <div class="text-center">
            <button class="btn btn-default mx-auto" type="submit">Sign up</button>
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
        passwordFieldType: 'password',
        payload: {
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
      switchVisibility () {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      register () {
        this.$auth.register({
          data: this.payload,
          autoLogin: true,
          rememberMe: true,
          redirect: {
            name: 'Index'
          },
          error: function () {}
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

