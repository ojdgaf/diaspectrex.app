<template>
  <div v-if="userIsReady">
    <div class="row">
      <div class="form-group col-md-4 col-sm-12 offset-md-4">
        <c-input v-if="rolesAreReady" v-model="user.roles"
                 v-validate="'required'" :options="roles" :multiple="true"
                 label="name" track-by="id" ll="Role" ph="Select role" component="multiselect">
        </c-input>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-md-2 col-sm-12 offset-md-3">
        <c-input v-model="user.first_name" v-validate="'required|alpha|min:2|max:255'"
                 ll="First name" ph>
        </c-input>
      </div>
      <div class="col-md-2 col-sm-12">
        <c-input v-model="user.middle_name" v-validate="'alpha|min:2|max:255'"
                 ll="Middle name" ph>
        </c-input>
      </div>
      <div class="col-md-2 col-sm-12">
        <c-input v-model="user.last_name" v-validate="'required|alpha|min:2|max:255'"
                 ll="Last name" ph>
        </c-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-sm-12 offset-md-2">
        <c-input v-model="user.email" v-validate="'required|email'" ll="Email" ph>
        </c-input>
      </div>
      <div class="col-md-4 col-sm-12">
        <c-input v-model="user.password" v-if="! userExists" v-validate="'required|min:6'"
                 ll="Password" ph>
        </c-input>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-md-4 col-sm-12 offset-md-2">
        <label class="control-label">Sex</label>
        <div>
          <c-radio v-model="user.sex" name="sex" label="male" inline>Male</c-radio>
          <c-radio v-model="user.sex" name="sex" label="female" inline>Female</c-radio>
        </div>
      </div>
      <div class="form-group col-md-4 col-sm-12">
        <c-input v-model="user.birthday" v-validate="'required'"
                 ll="Birthday" ph component="datetime">
        </c-input>
      </div>
    </div>

    <div v-if="user.can('be support|be employee|be doctor|be head')">
      <hr>
      <div class="row">
        <div class="form-group col-md-4 col-sm-12 offset-md-2">
          <c-input v-if="hospitalsAreReady" v-model="user.hospital"
                   v-validate="'required'" :options="hospitals"
                   label="name" track-by="id" ll="Hospital" ph="Select hospital"
                   component="multiselect">
          </c-input>
        </div>
        <div class="col-md-4 col-sm-12">
          <c-input v-model="user.passport" v-validate="'required|min:5|max:10'" ll="Passport" ph>
          </c-input>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4 col-sm-12 offset-md-2">
          <label class="control-label">Currently present</label>
          <div>
            <c-radio v-model="user.is_present" name="is present" :label="true" inline>Yes</c-radio>
            <c-radio v-model="user.is_present" name="is present" :label="false" inline>No</c-radio>
          </div>
        </div>
        <div class="form-group col-md-4 col-sm-12">
          <c-input v-model="user.hired_at" v-validate="'required'"
                   ll="Hired at" ph component="datetime">
          </c-input>
        </div>
      </div>
    </div>

    <div v-if="user.can('be doctor|be head')">
      <hr>
      <div class="row">
        <div class="col-md-4 col-sm-12 offset-md-2">
          <c-input v-model="user.degree" v-validate="'required|min:6'" ll="Doctor degree" ph>
          </c-input>
        </div>
      </div>
    </div>

    <div v-if="user.can('be support|be employee|be doctor|be head')">
      <hr>
      <div class="row">
        <div class="form-group col-md-8 col-sm-12 offset-md-2">
          <c-input v-model="user.about" ll="Something about..." component="wysiwyg"></c-input>
        </div>
      </div>
      <hr>
    </div>

    <div class="row">
      <address-component ref="addressComponent" :entity-address="user.address" :has-flat="true"
                         class="col-md-8 col-sm-12 offset-md-2"
      ></address-component>
    </div>

    <hr>

    <div class="row">
      <div class="col-md-8 col-sm-12 offset-md-2 text-right">
        <button @click="validateBeforeAction" class="btn btn-success btn-fill">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputGroup',
    props: {
      initialUser: Object,
      action: Function
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
      userExists: function () {
        return !! this.user.id
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
        return this.$user(this.initialUser).then(user => {
          user.birthday = this.$iso(user.birthday)
          user.hired_at = this.$iso(user.hired_at)
          this.user = user
        })
      },
      setRoles () {
        return this.axios.get('roles').then(res => this.roles = res.data)
      },
      setHospitals () {
        return this.axios.get('hospitals').then(res => this.hospitals = res.data)
      },
      validateBeforeAction () {
        this.$validator.validateAll()
          .then(result => result ? this.callAction() : this.$unfortunately('Please check input'))
      },
      callAction () {
        this.preparedUser().then(user => this.action(user))
      },
      async preparedUser () {
        let user = this._.cloneDeep(this.user)

        user.address_id = await this.$refs.addressComponent.getAddressId()
        user.birthday = this.$unix(user.birthday)

        if (user.can('be support|be employee|be doctor|be head')) {
          user.hospital_id = user.hospital.id
          user.hired_at = this.$unix(user.hired_at)
        }

        user.role_ids = user.roles.map(role => role.id)

        return user
      }
    }
  }
</script>
<style scoped>

</style>
