<template>
  <td class="text-center">
    <span v-if="overlarge" @click="alertValue">...</span>
    <span v-else v-html="value"></span>
  </td>
</template>

<script>
  export default {
    name: 'CTd',
    props: {
      column: {
        type: [String, Object],
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        booleans: {
          true: `<i class="fa fa-check"></i>`,
          false: `<i class="fa fa-minus"></i>`
        },
        strings: {
          male: `<i class="fa fa-male"></i>`,
          female: `<i class="fa fa-female"></i>`
        },
        empty: `<i class="fa fa-times"></i>`
      }
    },
    computed: {
      value: function () {
        if (this.itemHasProperty())
          return this.propertyValue();

        return this.empty
      },
      overlarge: function () {
        return this.value && this.value.length > 100
      }
    },
    methods: {
      alertValue () {
        this.$swal({
          html: this.value
        })
      },
      itemHasProperty () {
        return this._.get(this.item, this.propertyActualName()) !== undefined
      },
      propertyValue () {
        const value = this._.get(this.item, this.propertyActualName())

        switch (typeof value) {
          case 'boolean':
            return this.filterBooleans(value)
          case 'string':
            return this.filterStrings(value)
          default:
            return value
        }
      },
      propertyActualName () {
        if (typeof this.column === 'string')
          return this.transformDisplayNameToActual(this.column)

        return this.column.hasOwnProperty('actual') ?
          this.column.actual : this.transformDisplayNameToActual(this.column.display)
      },
      transformDisplayNameToActual (propertyDisplayName) {
        return propertyDisplayName.replace(/\s+/g, '_').toLowerCase()
      },
      filterBooleans (value) {
        return value ? this.booleans.true : this.booleans.false
      },
      filterStrings (value) {
        return this.strings.hasOwnProperty(value) ? this.strings[value] : value
      }
    }
  }
</script>

<style scoped>

</style>
