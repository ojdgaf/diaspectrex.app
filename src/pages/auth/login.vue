<template>
  <div class="login">
    <div class="card">
      <div class="card-body col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div class="card-body-content">
          <div class="logo-wrapper">
            <img class="card-img-top" src="static/img/logo.png" alt="DiaSpectrEx">
          </div>
          <form v-on:submit.prevent="login">
            <c-input-group v-model="credentials.email" v-validate="'required|email'"
                           ll="Email" ph="Type email...">
              <template slot="prepend">
                <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
              </template>
            </c-input-group>

            <c-input-group v-model="credentials.password" v-validate="'required|min:6'"
                           :type="passwordFieldType" ll="Password" ph="Type password..."
                           :st="{borderRight: 'none'}">
              <template slot="prepend">
                <span class="input-group-text">
                  <i class="fas fa-key"></i>
                </span>
              </template>
              <template slot="append">
                <span class="input-group-text btn-eye-wrapper">
                    <button class="btn-eye" type="button"
                            @mousedown="passwordFieldType = 'text'"
                            @mouseup="passwordFieldType = 'password'">
                      <i class="fas fa-eye"></i>
                    </button>
                  </span>
              </template>
            </c-input-group>

            <div class="links-wrapper">
              <router-link :to="{ name: 'Password request' }">
                Forgot password?
              </router-link>
              <router-link :to="{ name: 'Register' }">
                Sign up
              </router-link>
            </div>

            <div class="text-center">
              <button class="btn btn-info btn-fill btn-block" type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      <div class="copyright text-center">
        &copy; All rights reserved |
        <a href="https://github.com/roman-dubovoy" target="_blank">Roman Dubovoy</a> |
        <a href="https://github.com/ojdgaf" target="_blank">Eugene Burdeinyi</a> | 2018.
      </div>
    </div>
  </div>
</template>

<script>
  import CInputGroup from 'src/components/UIComponents/Inputs/InputGroup'

  export default {
    components: {
      CInputGroup
    },
    data () {
      return {
        passwordFieldType: 'password',
        credentials: {
          email: 'bu@dx.com',
          password: 'secret'
        }
      }
    },
    methods: {
      login () {
        this.$validator.validateAll()
          .then(result => result ? this.performLoginRequest() : this.$unfortunately('Please check input'))
      },
      performLoginRequest () {
        this.$auth.login({
          data: this.credentials,
          rememberMe: true,
          fetchUser: true,
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
  .card {
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/static/img/background-1.jpg') no-repeat center;
    background-size: cover;
    border: none;
  }

  .card-body {
    flex-grow: 2;
  }

  .card-body-content {
    height: 380px;
    background-color: #fff;
    padding: 5px 40px;
    margin-top: 60px;
    border-radius: 15px;
  }

  .logo-wrapper {
    padding: 10px 15px;
    margin-bottom: 15px;
    text-align: center;
    border-bottom: 2px solid #26a69a;
  }

  .logo-wrapper img {
    max-width: 300px;
  }

  .links-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .links-wrapper a {
    color: #26a69a
  }

  .links-wrapper a:hover {
    text-decoration: underline;
  }

  .copyright {
    padding: 20px 0;
    color: #fff;
    font-weight: 300;
    font-size: 0.9em;
  }

  .copyright a {
    color: #fff;
  }

  .copyright a:hover {
    color: #1DC7EA;
  }

  .btn-info {
    margin-top: 15px;
    background-color: #26a69a;
    border: none;
  }

  .btn-info:hover {
    background-color: #30d6c9;
  }

  .btn-eye-wrapper {
    background: #fff;
    border-left: none;
    border-color: #E3E3E3;
  }

  input[type="password"]:focus + .input-group-append > .btn-eye-wrapper {
    border-color: #aaa;
  }

  .btn-eye {
    background: transparent;
    color: transparent;
    border: none;
    padding: 0;
    outline: transparent;
  }

  .btn-eye:hover {
    color: #333;
  }
</style>
