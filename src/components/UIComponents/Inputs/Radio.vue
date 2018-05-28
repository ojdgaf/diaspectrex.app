<template>
  <div class="form-check-radio" :class="inlineClass">
    <label :for="cbId" class="form-check-label">
      <input :id="cbId"
             type="radio"
             class="form-control"
             :disabled="disabled"
             :value="label"
             v-model="model"/>
      <span class="form-check-sign">
        <slot></slot>
      </span>
    </label>
  </div>
</template>
<script>
  export default {
    name: 'CRadio',
    props: {
      label: [String, Number, Boolean],
      disabled: [Boolean, String],
      value: [String, Boolean],
      inline: Boolean
    },
    data () {
      return {
        cbId: ''
      }
    },
    computed: {
      model: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      },
      inlineClass () {
        return this.inline ? `form-check-inline` : ''
      }
    },
    created () {
      this.cbId = Math.random().toString(16).slice(2)
    }
  }
</script>
