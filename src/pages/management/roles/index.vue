<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                { name: 'management', title: 'Management' },
                { name: '', title: 'Roles' }]">
              </breadcrumbs>
              <title-block title="Roles management" :add-link="{ name: 'roles.create' }">
              </title-block>
            </template>
            <c-table class="table table-hover table-striped table-responsive"
                     :columns="tableColumns" :data="tableData" :buttons="tableButtons">
            </c-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CTable from 'src/components/UIComponents/Table/Index'

  export default {
    name: 'Roles',
    components: {
      CTable
    },
    data () {
      return {
        tableColumns: [
          {display: 'Name', actual: 'name'},
          {display: 'Title', actual: 'display_name'},
          'Description'
        ],
        tableButtons: [
          {
            route: {
              name: 'roles.edit',
              params: {id: 'id'}
            },
            display: `<i class="fa fa-edit"></i>`
          },
          {
            method: this.deleteRole,
            class: 'btn-danger',
            display: `<i class="fa fa-trash"></i>`
          }
        ],
        tableData: null
      }
    },
    created: function () {
      this.setRoles()
    },
    methods: {
      setRoles () {
        return this.loadRoles().then(roles => this.tableData = roles)
      },
      loadRoles () {
        return this.axios.get(`roles`).then(res => res.data)
      },
      deleteRole (role) {
        this.$askForConfirmation('You are trying to delete role')
          .then(res => res ? this.performDeleteRequest(role) : {})
      },
      performDeleteRequest (role) {
        this.axios.delete(`roles/${role.id}`).then(res => this.setRoles())
      }
    }
  }
</script>

<style>
</style>
