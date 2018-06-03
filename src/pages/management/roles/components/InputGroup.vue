<template>
  <div>
    <div class="row justify-content-center">
      <fg-input v-model="role.name" label="Name" placeholder="Name"></fg-input>
    </div>
    <div class="row justify-content-center">
      <fg-input v-model="role.display_name" label="Title" placeholder="Title"></fg-input>
    </div>
    <div class="row justify-content-center">
      <fg-input v-model="role.description" label="Description" placeholder="Description"></fg-input>
    </div>
    <div class="row justify-content-center">
      <div class="form-group">
        <label class="control-label">Role</label>
        <multiselect v-if="permissionsAreReady" v-model="role.permissions" :options="permissions"
                     :multiple="true" label="name" track-by="id"
                     placeholder="Select permissions">
        </multiselect>
      </div>
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
