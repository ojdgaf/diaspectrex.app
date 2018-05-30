<template>
  <div class="login">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="static/img/diaspectrex.jpg" alt="logo">
      <div class="card-body">
        <form v-on:submit.prevent="register()">
          <fg-input v-model="user.email" v-validate="'required|email'"
                    type="email" name="email" placeholder="Email">
          </fg-input>

          <fg-input v-model="user.first_name" v-validate="'required|alpha'"
                    name="first_name" placeholder="First name">
          </fg-input>

          <fg-input v-model="user.middle_name" v-validate="'alpha'"
                    name="middle_name" placeholder="Middle name">
          </fg-input>

          <fg-input v-model="user.last_name" v-validate="'required|alpha'"
                    name="last_name" placeholder="Last name">
          </fg-input>

          <div class="text-center">
            <c-radio v-model="user.sex" label="male" inline>Male</c-radio>
            <c-radio v-model="user.sex" label="female" inline>Female</c-radio>
          </div>

          <div class="form-group">
            <datetime v-model="user.birthday" v-validate="'required'"
                      name="birthday" input-class="form-control" placeholder="Birthday">
            </datetime>
          </div>

          <fg-input v-model="user.password" :type="passwordFieldType"
                    v-validate="'required|confirmed:password_confirmation'"
                    name="password" placeholder="Password">
          </fg-input>

          <fg-input v-model="user.password_confirmation" :type="passwordFieldType"
                    v-validate="'required'"
                    name="password_confirmation" placeholder="Confirm password">
          </fg-input>

          <button @click="switchVisibility" type="button" class="btn btn-dark btn-sm">
            {{passwordButtonText}}
          </button>

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
    data () {
      return {
        passwordFieldType: 'password',
        user: {}
      }
    },
    created: function () {
      this.$user().then(user => this.user = user)
    },
    computed: {
      passwordButtonText: function () {
        return this.passwordFieldType === 'password' ? 'show' : 'hide'
      }
    },
    methods: {
      switchVisibility () {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      register () {
        this.$validator.validateAll()
          .then(result => result ? this.performRegisterRequest() : this.$unfortunately('Please check input'))
      },
      performRegisterRequest () {
        this.$auth.register({
          data: this.preparedUser(),
          autoLogin: true,
          rememberMe: true,
          redirect: {
            name: 'Index'
          },
          error: function () {
          }
        })
      },
      preparedUser () {
        let user = this._.cloneDeep(this.user)

        user.birthday = timestamp(user.birthday)

        return user
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

