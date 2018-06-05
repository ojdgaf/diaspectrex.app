<template>
  <div class="row">
    <div class="col-sm-6 offset-3">
      <form v-on:submit.prevent="reset()">
        <c-input v-model="payload.email" v-validate="'required|email'" ll="Email" ph></c-input>

        <c-input v-model="payload.password" :type="passwordFieldType"
                 v-validate="'required|min:6|confirmed:password confirmation'"
                 ll="Password" ph>
        </c-input>

        <c-input v-model="payload.password_confirmation" :type="passwordFieldType"
                 v-validate="'required'"
                 name="password confirmation" ll="Confirm password" ph>
        </c-input>

        <button @click="switchVisibility" type="button" class="btn btn-dark btn-sm">
          {{passwordButtonText}}
        </button>

        <div class="text-center">
          <button class="btn btn-default mx-auto" type="submit">Reset password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        passwordFieldType: 'password',
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
      }
    }
  }
</script>
