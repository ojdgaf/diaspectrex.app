<template>
  <div class="reset">
    <div class="card">
      <div class="card-body col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div class="card-body-content">
          <div class="logo-wrapper">
            <img class="card-img-top" src="static/img/logo.png" alt="DiaSpectrEx">
          </div>
          <form v-on:submit.prevent="reset()">
            <c-input-group v-model="payload.email" v-validate="'required|email'"
                           ll="Email" ph="Type email...">
              <template slot="prepend">
                <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
              </template>
            </c-input-group>

            <c-input-group v-model="payload.password"
                           v-validate="'required|min:6'"
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

            <c-input-group v-model="payload.password_confirmation"
                           v-validate="'required|min:6|confirmed:password'"
                           :type="confirmPasswordFieldType" ll="Confirm password" ph="Confirm password..."
                           :st="{borderRight: 'none'}">
              <template slot="prepend">
                <span class="input-group-text">
                  <i class="fas fa-key"></i>
                </span>
              </template>
              <template slot="append">
                <span class="input-group-text btn-eye-wrapper">
                    <button class="btn-eye" type="button"
                            @mousedown="confirmPasswordFieldType = 'text'"
                            @mouseup="confirmPasswordFieldType = 'password'">
                      <i class="fas fa-eye"></i>
                    </button>
                  </span>
              </template>
            </c-input-group>

            <div class="text-center">
              <button class="btn btn-info btn-fill btn-block" type="submit">Reset password</button>
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
        confirmPasswordFieldType: 'password',
        payload: {
          email: '',
          password: '',
          password_confirmation: '',
          token: ''
        }
      }
    },
    created () {
      this.payload.email = this.$route.query.email
      this.payload.token = this.$route.params.token
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
      reset () {
        this.$validator.validateAll()
          .then(result => result ? this.performReset() : this.$unfortunately('Please check input'))
      },
      performReset () {
        this.axios.post('auth/password/reset', this.payload)
          .then(res => this.login())
          .catch(err => {})
      },
      login () {
        this.$auth.login({
          data: this.payload,
          rememberMe: true,
          fetchUser: true,
          redirect: {
            name: 'Index'
          },
          error: function () {}
        })
      },
      showPassword( e ) {
          e.target.parentNode.parentNode.parentNode.previousElementSibling.type="text";
          e.target.parentNode.parentNode.parentNode.previousElementSibling.style.borderRight="none";
      },
      hidePassword ( e ) {
          e.target.parentNode.parentNode.parentNode.previousElementSibling.type="password";
      }
    }
  }
</script>

<style scoped>
  .card {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('/static/img/background-1.jpg')
    no-repeat center;
    background-size: cover;
    border: none;
  }

  .card-body {
    flex-grow: 2;
  }

  .card-body-content {
    height: auto;
    background-color: #fff;
    padding: 5px 40px 20px 40px;
    margin-top: 15px;
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

  label {
    text-transform: uppercase;
    color: #a3a3a3;
    margin-bottom: 0.1rem;
    font-size: 0.9em;
  }

  .btn-info {
    margin-top: 15px;
    background-color: #26a69a !important;
    border: none;
  }

  .btn-info:hover {
    background-color: #26b0a4 !important;
  }

  .btn-info:active,
  .btn-info:visited {
    background-color: #26a69a !important;
  }

  .flexible-wrapper input[type="text"] {
    width: 100%;
  }

  .flexible-wrapper .form-group {
    margin-bottom: 10px;
  }

  .checkboxes-group {
    height: 40px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 0.1rem;
  }

  .checkboxes-group .form-check-radio {
    margin-right: 10px;
    margin-bottom: 0;
  }

  .checkbox-label {
    text-transform: uppercase;
    color: #a3a3a3;
  }

  input[type="password"] {
    border-right: none;
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

  .btn-eye:active .btn-eye-wrapper{
    border-left: none;
  }

  .btn-eye:active input[type="password"]{
    border-right: none;
  }

  .btn-eye:hover {
    color: #333;
  }
</style>