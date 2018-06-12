<template>
  <div class="form-group">
    <label :for="id" class="control-label">{{ll}}</label>
    <component v-bind="$attrs" @input="emit" @html="emit"
               :is="component" :id="id" :value="value" :html="value" :name="name" :placeholder="placeholder"
               :class="componentClass" :input-class="componentInputClass">
    </component>
    <div :class="feedbackClass">{{errors.first(scopedName)}}</div>
  </div>
</template>

<script>
  /*
    @html because wysiwyg emits only 'html' and 'change' events
    ll instead of label because multiselect uses label for its specific needs
    multiselect does not have input red border because there is neither SASS nor CSS file provided
    computed name is for messages displayed by validation
    component inherits vee validator so all its data will be available in parent component
    input-class binding is for bootstrap-like datetime picker displaying
  */

  export default {
    name: 'CInput',
    inheritAttrs: false,
    inject: ['$validator'],
    props: {
      value: {},
      scope: {
        type: String,
        default: ''
      },
      ll: {
        type: String,
        required: true
      },
      ph: {
        type: [Boolean, String],
        default: false
      },
      component: {
        type: String,
        default: 'b-form-input',
        validator: function (value) {
          return ['b-form-input', 'datetime', 'multiselect', 'wysiwyg'].includes(value)
        }
      }
    },
    data () {
      return {
        id: null,
        prevState: null
      }
    },
    created () {
      this.id = Math.random().toString(16).slice(2)
    },
    computed: {
      name: function () {
        return this.$attrs.name ? this.$attrs.name : this.ll.toLowerCase()
      },
      scopedName: function () {
        return (this.scope ? this.scope + '.' : '') + this.name
      },
      placeholder: function () {
        return this.ph.length ? this.ph : this.ph ? this.ll : ''
      },
      state: function () {
        const hasErrors = this.errors.has(this.scopedName)

        if (hasErrors)
          this.prevState = false
        else if (this.prevState === null)
          this.prevState = null
        else if (this.prevState === false)
          this.prevState = true

        return this.prevState
      },
      defaultClass: function () {
        return 'form-control' + (this.state === null ? '' : this.state ? ' is-valid' : ' is-invalid')
      },
      wysiwygClass: function () {
        return this.state === null ? '' : this.state ? ' editr-valid' : 'editr-invalid'
      },
      componentClass: function () {
        switch (this.component) {
          case 'b-form-input':
            return this.defaultClass
          case 'wysiwyg':
            return this.wysiwygClass
          default:
            return ''
        }
      },
      componentInputClass: function () {
        switch (this.component) {
          case 'datetime':
            return this.defaultClass
          default:
            return ''
        }
      },
      feedbackClass: function () {
        return {
          'invalid-feedback': true,
          'd-block': this.state === false
        }
      }
    },
    methods: {
      emit (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped>
  .control-label {
    text-transform: uppercase;
    color: #a3a3a3;
    margin-bottom: 0.1rem;
    font-size: 0.9em;
  }

  .editr-valid {
    border: 1px solid #28a745;
    width: 100%;
  }

  .editr-invalid {
    border: 1px solid #dc3545;
    width: 100%;
  }
</style>
