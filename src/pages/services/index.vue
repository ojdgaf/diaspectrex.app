<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <breadcrumbs :links="[{name: '', title: 'Services' }]"></breadcrumbs>
              <title-block title="Services" :add-link="{ name: 'services.create' }"></title-block>
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
          },
          {
            method: this.deleteService,
            class: 'btn-danger',
            display: `<i class="fas fa-trash"></i>`
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
      },
      deleteService (service) {
        this.$askForConfirmation('You are trying to delete service')
          .then(res => res ? this.performDeleteRequest(service) : {})
      },
      performDeleteRequest (service) {
        this.axios.delete(`services/${service.id}`).then(res => this.setServices())
      }
    }
  }
</script>

<style>
</style>
