<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <a @click="logout()" href="#" class="nav-link">
        <i class="fas fa-sign-out-alt"></i>
        Log out
      </a>
    </li>
  </ul>
</template>
<script>
  import DropDown from 'src/components/UIComponents/Dropdown.vue'

  export default {
    components: {
      DropDown
    },
    methods: {
      logout () {
        this.$auth.logout({
          makeRequest: false,
          redirect: {
            name: 'Login'
          }
        })
      }
    }
  }
</script>
<style>
</style>
