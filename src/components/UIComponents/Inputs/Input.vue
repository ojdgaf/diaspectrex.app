<template>
  <div class="form-group">
    <label v-if="label" class="control-label">{{label}}</label>
    <b-form-input v-bind="$attrs" @input="emit"
                  :value="value" :state="state" :name="name" :placeholder="ph"
                  class="form-control">
    </b-form-input>
    <b-form-invalid-feedback>{{errors.first(name)}}</b-form-invalid-feedback>
  </div>
</template>

<script>
  export default {
    name: 'CInput',
    inheritAttrs: false,
    inject: ['$validator'],
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number]
      },
      placeholder: {
        type: [Boolean, String],
        default: false
      }
    },
    computed: {
      name: function () {
        return this.$attrs.name ? this.$attrs.name : this.label.toLowerCase()
      },
      ph: function () {
        return this.placeholder.length ? this.placeholder : this.placeholder ? this.label : ''
      },
      state: function () {
        return this.errors.items.length ? ! this.errors.has(this.name) : null
      }
    },
    methods: {
      emit (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style>

</style>
