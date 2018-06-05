<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!--<sidebar-link to="/admin/overview">-->
      <!--<i class="nc-icon nc-chart-pie-35"></i>-->
      <!--<p>Dashboard</p>-->
      <!--</sidebar-link>-->
      <!--<sidebar-link to="/admin/user">-->
      <!--<i class="nc-icon nc-circle-09"></i>-->
      <!--<p>User Profile</p>-->
      <!--</sidebar-link>-->
      <!--<sidebar-link to="/admin/table-list">-->
      <!--<i class="nc-icon nc-notes"></i>-->
      <!--<p>Table list</p>-->
      <!--</sidebar-link>-->
      <!--<sidebar-link to="/admin/typography">-->
      <!--<i class="nc-icon nc-paper-2"></i>-->
      <!--<p>Typography</p>-->
      <!--</sidebar-link>-->
      <!--<sidebar-link to="/admin/icons">-->
      <!--<i class="nc-icon nc-atom"></i>-->
      <!--<p>Icons</p>-->
      <!--</sidebar-link>-->
      <!--<sidebar-link to="/admin/notifications">-->
      <!--<i class="nc-icon nc-bell-55"></i>-->
      <!--<p>Notifications</p>-->
      <!--</sidebar-link>-->

      <sidebar-link to="/admin/management">
        <i class="fas fa-sliders-h"></i>
        <p>Management</p>
      </sidebar-link>

      <sidebar-link to="/admin/hospitals">
        <i class="fas fa-hospital-alt"></i>
        <p>Hospitals</p>
      </sidebar-link>

      <sidebar-link to="/admin/patient-cards">
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

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
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
