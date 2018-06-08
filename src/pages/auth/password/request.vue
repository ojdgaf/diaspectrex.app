<template>
  <div class="request">
    <div class="card">
      <div class="card-body col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div class="card-body-content">
          <div class="logo-wrapper">
            <img class="card-img-top" src="static/img/logo.png" alt="DiaSpectrEx">
          </div>
          <form v-on:submit.prevent="request()">
            <c-input-group v-model="payload.email" v-validate="'required|email'"
                           ll="Email" ph="Type email...">
              <template slot="prepend">
                <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
              </template>
            </c-input-group>

            <div class="text-center">
              <button class="btn btn-info btn-fill btn-block" type="submit">
                Send reset link
              </button>
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
        payload: {
          email: 'a@a.a'
        }
      }
    },
    methods: {
      request () {
        this.$validator.validateAll()
          .then(result => result ? this.sendResetLinkEmail() : this.$unfortunately('Please check input'))
      },
      sendResetLinkEmail () {
        this.axios.post('auth/password/email', this.payload)
          .then(res => this.payload.email = '')
          .catch(err => {})
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
    height: auto;
    background-color: #fff;
    padding: 5px 40px 20px 40px;
    margin-top: 90px;
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

</style>

