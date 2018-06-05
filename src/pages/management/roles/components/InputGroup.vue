<template>
  <div>
    <div class="row justify-content-center">
      <c-input v-model="role.name" v-validate="'required|alpha|min:3'" ll="Name" ph>
      </c-input>
    </div>
    <div class="row justify-content-center">
      <c-input v-model="role.display_name" v-validate="'required|alpha|min:3'" ll="Title" ph>
      </c-input>
    </div>
    <div class="row justify-content-center">
      <c-input v-model="role.description" v-validate="'alpha|min:6'" ll="Description" ph>
      </c-input>
    </div>
    <div class="row justify-content-center">
      <c-input v-if="permissionsAreReady" v-model="role.permissions"
               v-validate="'required'" :options="permissions" :multiple="true"
               label="name" track-by="id" ll="Permissions" ph="Select permissions"
               component="multiselect">
      </c-input>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 offset-md-3 text-right">
        <button @click="validateBeforeAction" class="btn btn-success btn-fill">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputGroup',
    props: {
      role: {
        type: Object,
        default: function () {
          return {
            name: null,
            display_name: null,
            description: null,
            permissions: []
          }
        }
      },
      action: Function
    },
    data () {
      return {
        permissions: null
      }
    },
    created: function () {
      this.setPermissions()
    },
    computed: {
      permissionsAreReady: function () {
        return this.permissions !== null
      }
    },
    methods: {
      setPermissions () {
        return this.axios.get('permissions').then(res => this.permissions = res.data)
      },
      validateBeforeAction () {
        this.$validator.validateAll()
          .then(result => result ? this.callAction() : this.$unfortunately('Please check input'))
      },
      callAction () {
        this.action(this.preparedRole())
      },
      preparedRole () {
        let role = this._.cloneDeep(this.role)

        role.permission_ids = role.permissions.map(permission => permission.id)

        return role
      }
    }
  }
</script>

<style scoped>

</style>
