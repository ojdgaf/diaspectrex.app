<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                { name: 'management', title: 'Management' }]">
              </breadcrumbs>
            </template>

            <div class="col-md-6 col-sm-12 offset-md-3">
              <h4 class="text-center">View, create, edit or delete <b>users</b>:
                <router-link class="btn btn-large" :to="{ name: 'users.index' }">
                  Manage users
                </router-link>
              </h4>
              <h4 class="text-center">View, create, edit or delete <b>roles</b>:
                <router-link class="btn btn-large" :to="{ name: 'roles.index' }">
                  Manage roles
                </router-link>
              </h4>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ManagementMainPage'
  }
</script>

<style scoped>

</style>
