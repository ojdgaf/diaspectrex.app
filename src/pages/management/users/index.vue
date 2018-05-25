<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Users</h4>
              <p class="card-category"></p>
            </template>
            <div class="table-responsive">
              <l-table class="table table-hover table-striped" :columns="tableColumns"
                       :data="tableData">
                <template slot="columns">
                  <th>Operations</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Birthday</th>
                  <th>Address</th>
                  <th>Hospital</th>
                  <th>Passport</th>
                  <th>Present</th>
                  <th>About</th>
                  <th>Hired at</th>
                  <th>Fired at</th>
                  <th>Degree</th>
                </template>
                <template slot-scope="{row}">
                  <td>
                    <button class="btn btn-icon btn-info">
                      <router-link :to="{ name: 'users.edit', params: { id: row.id }}">
                        <i class="fa fa-edit"></i>
                      </router-link>
                    </button>
                    <button class="btn btn-icon btn-danger" @click="deleteUser(row)"><i
                      class="fa fa-trash"></i></button>
                  </td>
                  <td>{{row.email}}</td>
                  <td>{{row.name}}</td>
                  <td>{{row.sex}}</td>
                  <td>{{row.birthday}}</td>
                  <td>{{row.address}}</td>
                  <td>{{row.hospital}}</td>
                  <td>{{row.passport}}</td>
                  <td>{{row.is_present}}</td>
                  <td>{{row.about}}</td>
                  <td>{{row.hired_at}}</td>
                  <td>{{row.fired_at}}</td>
                  <td>{{row.degree}}</td>
                </template>
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LTable from '@/components/UIComponents/Table.vue'
  import Card from '@/components/UIComponents/Cards/Card.vue'

  export default {
    name: 'ManagementUsersIndexPage',
    components: {
      LTable,
      Card
    },
    data () {
      return {
        tableColumns: ['Operations', 'Email', 'Name', 'Sex', 'Birthday', 'Address', 'Hospital', 'Passport', 'Present', 'About'],
        tableData: null
      }
    },
    created: function () {
      this.setUsers()
    },
    methods: {
      deleteUser (user) {
        if (this.$askForConfirmation('You are trying to delete user'))
          this.performDeleteRequest(user)
      },
      setUsers () {
        this.loadUsers().then(users => this.tableData = users)
      },
      loadUsers () {
        return this.axios.get('users').then(res => res.data)
      },
      performDeleteRequest() {

      },
      $areYouSure(text) {}
    }
  }
</script>

<style>
</style>
