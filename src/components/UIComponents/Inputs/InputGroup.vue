<template>
  <div class="form-group">
    <label :for="id" class="control-label">{{ll}}</label>
    <div class="input-group" :class="groupClass">
      <div v-if="hasPrependSlot" class="input-group-prepend">
        <slot name="prepend"></slot>
      </div>
      <component v-bind="$attrs" @input="emit" @html="emit"
                 :is="component" :id="id" :value="value" :name="name" :placeholder="placeholder"
                 :style="st">
      </component>
      <div v-if="hasAppendSlot" class="input-group-append">
        <slot name="append"></slot>
      </div>
    </div>
    <div :class="feedbackClass">{{errors.first(scopedName)}}</div>
  </div>
</template>

<script>
  export default {
    name: 'CInputGroup',
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
      st: {
        default: null
      },
      component: {
        type: String,
        default: 'b-form-input',
        validator: function (value) {
          return ['b-form-input'].includes(value)
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
      hasPrependSlot: function () {
        return ! ! this.$slots['prepend'];
      },
      hasAppendSlot: function () {
        return ! ! this.$slots['append'];
      },
      groupClass: function () {
        return this.state === null ? '' : this.state ? 'addon-valid' : 'addon-invalid'
      },
      feedbackClass: function () {
        return {
          'invalid-feedback': true,
          'd-block': this.state === false
        }
      },
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

  .input-group .form-control {
    height: auto !important;
  }

  .addon-valid {
    border: 1px solid #28a745;
    border-radius: 4px;
  }

  .addon-invalid {
    border: 1px solid #dc3545;
    border-radius: 4px;
  }
</style>
