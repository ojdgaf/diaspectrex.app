<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[{name: '', title: 'Services' }]"></breadcrumbs>
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
    name: 'Services',
    components: {
      CTable
    },
    data () {
      return {
        tableColumns: [
          'Name', 'Description', 'Price'
        ],
        tableButtons: [
          {
            route: {
              name: 'services.edit',
              params: {id: 'id'}
            },
            display: `<i class="fas fa-pencil-alt"></i>`
          }
        ],
        tableData: null
      }
    },
    created: function () {
      this.setServices()
    },
    methods: {
      setServices () {
        return this.loadServices().then(services => this.tableData = services)
      },
      loadServices () {
        return this.axios.get(`services`).then(res => res.data)
      }
    }
  }
</script>

<style>
</style>
