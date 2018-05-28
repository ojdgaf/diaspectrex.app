<template>
  <div v-if="userIsReady">
    <div class="row">
      <div class="form-group col-md-4 col-sm-12 offset-md-4">
        <label class="control-label">Role</label>
        <multiselect v-if="rolesAreReady" v-model="user.roles" :options="roles" :multiple="true"
                     label="name" track-by="id" placeholder="Select role">
        </multiselect>
      </div>
    </div>
    <hr>
    <div class="row">
      <fg-input v-model="user.first_name" class="col-md-2 col-sm-12 offset-md-3"
                label="First name" placeholder="First name">
      </fg-input>
      <fg-input v-model="user.middle_name" class="col-md-2 col-sm-12"
                label="Middle name" placeholder="Middle name">
      </fg-input>
      <fg-input v-model="user.last_name" class="col-md-2 col-sm-12"
                label="Last name" placeholder="Last name">
      </fg-input>
    </div>
    <div class="row">
      <fg-input v-model="user.email" class="col-md-4 col-sm-12 offset-md-2"
                label="Email" placeholder="Email">
      </fg-input>
      <fg-input v-model="user.password" class="col-md-4 col-sm-12"
                label="Password" placeholder="Password">
      </fg-input>
    </div>
    <div class="row">
      <div class="form-group col-md-4 col-sm-12 offset-md-2">
        <label class="control-label">Sex</label>
        <div>
          <c-radio v-model="user.sex" label="male" inline>Male</c-radio>
          <c-radio v-model="user.sex" label="female" inline>Female</c-radio>
        </div>
      </div>
      <div class="form-group col-md-4 col-sm-12">
        <label class="control-label">Birthday</label>
        <datetime v-model="user.birthday" input-class="form-control"></datetime>
      </div>
    </div>
    <div v-if="user.can('have employee attributes')">
      <hr>
      <div class="row">
        <div class="form-group col-md-4 col-sm-12 offset-md-2">
          <label class="control-label">Hospital</label>
          <multiselect v-if="hospitalsAreReady" v-model="user.hospital" :options="hospitals"
                       label="name" track-by="id" placeholder="Select hospital">
          </multiselect>
        </div>
        <fg-input v-model="user.passport" class="col-md-4 col-sm-12"
                  label="Passport" placeholder="Passport">
        </fg-input>
      </div>
      <div class="row">
        <div class="form-group col-md-4 col-sm-12 offset-md-2">
          <label class="control-label">Currently present</label>
          <div>
            <c-radio v-model="user.is_present" :label="true" inline>Yes</c-radio>
            <c-radio v-model="user.is_present" :label="false" inline>No</c-radio>
          </div>
        </div>
        <div class="form-group col-md-4 col-sm-12">
          <label class="control-label">Hired at</label>
          <datetime v-model="user.hired_at" input-class="form-control" type="datetime"></datetime>
        </div>
      </div>
    </div>
    <div v-if="user.can('have doctor attributes')">
      <hr>
      <div class="row">
        <fg-input v-model="user.degree" class="col-md-4 col-sm-12 offset-md-2"
                  label="Doctor degree" placeholder="Doctor degree">
        </fg-input>
      </div>
    </div>
    <div v-if="user.can('have employee attributes')">
      <hr>
      <div class="row">
        <div class="form-group col-md-8 col-sm-12 offset-md-2">
          <label class="control-label">Something about...</label>
          <wysiwyg v-model="user.about"></wysiwyg>
        </div>
      </div>
    </div>
    <div v-if="user.can('have employee attributes')">
      <hr>
      <div class="row">
        <address-component :address-id="user.address_id" :has-flat="true" ref="addressComponent" class="col-md-8 col-sm-12 offset-md-2">
        </address-component>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputGroup',
    props: {
      initialUser: Object
    },
    data () {
      return {
        user: null,
        roles: null,
        hospitals: null
      }
    },
    created: function () {
      this.wrapUser()
      this.setRoles()
      this.setHospitals()
    },
    computed: {
      userIsReady: function () {
        return this.user !== null
      },
      rolesAreReady: function () {
        return this.roles !== null
      },
      hospitalsAreReady: function () {
        return this.hospitals !== null
      }
    },
    methods: {
      wrapUser () {
        return this.$user(this.initialUser).then(user => this.user = user)
      },
      setRoles () {
        return this.axios.get('roles').then(res => this.roles = res.data)
      },
      setHospitals () {
        return this.axios.get('hospitals').then(res => this.hospitals = res.data)
      }
    }
  }
</script>
<style scoped>

</style>
