<template>
  <div class="login">
    <div class="card">
      <div class="card-body col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div class="card-body-content">
          <div class="logo-wrapper">
            <img class="card-img-top" src="static/img/logo.png" alt="DiaSpectrEx">
          </div>
          <form v-on:submit.prevent="login()">
            <div class="form-group">
              <label>
                Email:
              </label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="email-addon">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
                <input type="text" class="form-control"
                       v-model="credentials.email"
                       v-validate="'required|email'"
                       placeholder="Type email..." aria-describedby="email-addon">
              </div>
            </div>

            <div class="input-group">
              <div class="input-group-prepend">
                    <span class="input-group-text" id="confirm-password-addon">
                      <i class="fas fa-key"></i>
                    </span>
              </div>
              <input type="password" class="form-control"
                     v-model="user.password_confirmation"
                     v-validate="'required'"
                     placeholder="Confirm password..." aria-describedby="confirm-password-addon">
              <div class="input-group-append">
                    <span class="input-group-text btn-eye-wrapper">
                      <button class="btn-eye" type="button"
                              @mousedown="showPassword($event)"
                              @mouseup="hidePassword($event)"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                    </span>
              </div>
            </div>

            <div class="form-group">
              <label>
                Password:
              </label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="password-addon">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input type="password" class="form-control"
                       v-model="credentials.password"
                       v-validate="'required'"
                       placeholder="Type password..." aria-describedby="password-addon">
              </div>
            </div>

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
  export default {
    data () {
      return {
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
          error: function () {
          }
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
    background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('/static/img/background-1.jpg')
                no-repeat center;
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
    border-bottom: 2px solid #26a69a ;
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

  label {
    text-transform: uppercase;
    color: #a3a3a3;
    margin-bottom: 0.1rem;
    font-size: 0.9em;
  }

  .btn-info {
    margin-top: 15px;
    background-color: #26a69a;
    border: none;
  }

  .btn-info:hover {
    background-color: #30d6c9;
  }
</style>