<template>
  <div class="row">
    <div class="col-sm-6 offset-3">
      <form v-on:submit.prevent="reset()">
        <fg-input v-model="payload.email" required placeholder="Email"></fg-input>

        <fg-input v-model="payload.password" :type="passwordFieldType" required placeholder="Password"></fg-input>

        <fg-input v-model="payload.password_confirmation" :type="passwordFieldType" required placeholder="Confirm password"></fg-input>

        <button type="button" @click="switchVisibility">show / hide</button>

        <div class="text-center">
          <button class="btn btn-default mx-auto" type="submit">Reset password</button>
        </div>
      </form>
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
          password: '',
          password_confirmation: '',
          token: '',
        }
      }
    },
    created () {
      this.payload.email = this.$route.query.email
      this.payload.token = this.$route.params.token
    },
    methods: {
      switchVisibility () {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      reset () {
        if (! this.checkPasswordConformation()) {
          this.$unfortunately('The password confirmation does not match')
          this.payload.password_confirmation = ''
          return
        }

        this.performReset()
      },
      checkPasswordConformation () {
        return this.payload.password === this.payload.password_confirmation
      },
      performReset () {
        this.axios.post('auth/password/reset', this.payload)
          .then(response => {
            this.login()
          })
          .catch(error => {})
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
