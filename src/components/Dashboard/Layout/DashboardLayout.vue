<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link :to="{name: 'users.index'}">
        <i class="fas fa-users"></i>
        <p>Users</p>
      </sidebar-link>

      <sidebar-link :to="{name: 'roles.index'}">
        <i class="fas fa-user-tag"></i>
        <p>Roles</p>
      </sidebar-link>

      <sidebar-link :to="{name: 'hospitals.index'}">
        <i class="fas fa-hospital-alt"></i>
        <p>Hospitals</p>
      </sidebar-link>

      <sidebar-link :to="{name: 'patient_cards.index'}">
        <i class="fas fa-id-card"></i>
        <p>Patient cards</p>
      </sidebar-link>

      <sidebar-link to="/admin/services">
        <i class="far fa-money-bill-alt"></i>
        <p>Services</p>
      </sidebar-link>

      <sidebar-link to="/admin/classifiers">
        <i class="fas fa-sitemap"></i>
        <p>Classifiers</p>
      </sidebar-link>

      <sidebar-link to="/admin/diagnostic-groups">
        <i class="fas fa-object-group"></i>
        <p>Diagnostic groups</p>
      </sidebar-link>

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import Dropdown from '../../UIComponents/Dropdown.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      Dropdown
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
