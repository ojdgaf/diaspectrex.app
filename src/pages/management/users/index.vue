<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[
                { name: 'management', title: 'Management' },
                { name: 'users.index', title: 'Users' }]">
              </breadcrumbs>
              <title-block title="Users management" :add-link="{ name: 'users.create' }"></title-block>
            </template>
            <div class="table-responsive">
              <c-table class="table table-hover table-striped"
                       :columns="tableColumns" :data="tableData" :buttons="tableButtons">
              </c-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CTable from 'src/components/UIComponents/Table/Index'

  export default {
    name: 'ManagementUsersIndexPage',
    components: {
      CTable
    },
    data () {
      return {
        tableColumns: [
          'Email', 'Name', 'Sex', 'Birthday', 'Address', 'Hospital',
          'Passport', {display: 'Present', actual: 'is_present'}, 'About'
        ],
        tableButtons: [
          {
            route: {
              name: 'users.edit',
              params: {id: 'id'}
            },
            display: `<i class="fa fa-edit"></i>`
          },
          {
            method: this.deleteUser,
            class: 'btn-danger',
            display: `<i class="fa fa-trash"></i>`
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
        this.loadUsers().then(users => this.tableData = users)
      },
      loadUsers () {
        return this.axios.get(`users`).then(res => res.data)
      },
      deleteUser (user) {
        this.$askForConfirmation('You are trying to delete user')
          .then(res => res ? this.performDeleteRequest(user) : {})
      },
      performDeleteRequest (user) {
        this.axios.delete(`users/${user.id}`)
          .then(res => {
            this.$successfully(res.message)
            this.setUsers()
          })
      }
    }
  }
</script>

<style>
</style>
