<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                { name: '', title: 'Users' }]">
              </breadcrumbs>
              <title-block title="Users management" :add-link="{ name: 'users.create' }">
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
    name: 'Users',
    components: {
      CTable
    },
    data () {
      return {
        tableColumns: [
          'Email', 'Name', 'Sex', 'Birthday',
          {display: 'Address', actual: 'address.full'},
          {display: 'Hospital', actual: 'hospital.name'},
          'Passport', {display: 'Present', actual: 'is_present'}, 'About'
        ],
        tableButtons: [
          {
            route: {
              name: 'users.edit',
              params: {id: 'id'}
            },
            display: `<i class="fas fa-user-edit"></i>`
          },
          {
            method: this.deleteUser,
            class: 'btn-danger',
            display: `<i class="fas fa-user-alt-slash"></i>`
          }
        ],
        tableData: null
      }
    },
    created: function () {
      this.setUsers()
    },
    methods: {
      setUsers () {
        return this.loadUsers().then(users => this.tableData = users)
      },
      loadUsers () {
        return this.axios.get(`users`).then(res => res.data)
      },
      deleteUser (user) {
        this.$askForConfirmation('You are trying to delete user')
          .then(res => res ? this.performDeleteRequest(user) : {})
      },
      performDeleteRequest (user) {
        this.axios.delete(`users/${user.id}`).then(res => this.setUsers())
      }
    }
  }
</script>

<style>
</style>
